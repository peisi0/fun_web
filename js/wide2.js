// ==UserScript==
// @name         Jump & WalkSpeed Modifier (Narrow.one Fix)
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Simultaneous adjustment of jump and walk speed, walkSpeed fix.
// @author       SELO & Gemini
// @match        https://narrow.one/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
 
(() => {
    'use strict';

    // 核心注入函数：直接打入真实页面底层
    function injectToRealPage() {
        
        // 从本地缓存读取配置，免去每次刷新重新调整
        let jumpForce = parseFloat(localStorage.getItem('ipad_jump_force') || '20');
        let speedMultiplier = parseFloat(localStorage.getItem('ipad_speed_multiplier') || '1.0');
 
        // 1. 劫持跳跃力
        Object.defineProperty(Object.prototype, 'jumpForce', {
            get() { return this._jumpForce ?? jumpForce; },
            set(_) { this._jumpForce = jumpForce; },
            configurable: true
        });
 
        // 2. 智能劫持移动速度（仅对玩家自身或含有跳跃属性的对象生效，防止破坏箭矢速度）
        // === 关键修改：将之前盲猜的 speed/moveSpeed 改为正确的 walkSpeed ===
        ['walkSpeed'].forEach(prop => {
            Object.defineProperty(Object.prototype, prop, {
                get() {
                    if (this._isPlayer || 'jumpForce' in this || this._jumpForce !== undefined) {
                        this._isPlayer = true;
                        const base = this['_base_' + prop] ?? 1;
                        return base * speedMultiplier;
                    }
                    return this['_' + prop];
                },
                set(v) {
                    if (this._isPlayer || 'jumpForce' in this || this._jumpForce !== undefined) {
                        this._isPlayer = true;
                        this['_base_' + prop] = v;
                    } else {
                        this['_' + prop] = v;
                    }
                },
                configurable: true
            });
        });
 
        // 3. 创建强显控制面板（保持之前的所有 iPad 优化）
        function createMobileUI() {
            if (document.getElementById('jumpSpeedPanel')) return;
            if (window.innerWidth < 200) return; 

            // 悬浮球：这次直接钉在 html 顶层，使用最大 z-index，图标为⚡
            const toggleBtn = document.createElement('div');
            toggleBtn.innerText = '⚡';
            toggleBtn.style.cssText = `
                position: fixed !important; top: 25px !important; right: 25px !important; 
                width: 60px !important; height: 60px !important;
                background: rgba(30, 30, 30, 0.95) !important; color: #4caf50 !important; border-radius: 50% !important;
                display: flex !important; align-items: center !important; justify-content: center !important; font-size: 28px !important;
                z-index: 2147483647 !important; cursor: pointer !important; box-shadow: 0 6px 16px rgba(0,0,0,0.5) !important;
                border: 3px solid #4caf50 !important; user-select: none !important; -webkit-user-select: none !important;
            `;

            // 主面板
            const panel = document.createElement('div');
            panel.id = 'jumpSpeedPanel';
            panel.style.cssText = `
                position: fixed !important; top: 95px !important; right: 25px !important; 
                background: rgba(20, 20, 20, 0.98) !important; color: white !important; 
                padding: 22px !important; border-radius: 18px !important;
                z-index: 2147483646 !important; width: 270px !important;
                box-shadow: 0 10px 30px rgba(0,0,0,0.7) !important; border: 1px solid #444 !important; 
                display: none; font-family: -apple-system, BlinkMacSystemFont, sans-serif !important;
                user-select: none !important; -webkit-user-select: none !important;
            `;
 
            // --- 跳跃力控制组 ---
            const jumpLabel = document.createElement('div');
            jumpLabel.innerText = `🦘 Jump Force: ${jumpForce}`;
            jumpLabel.style.cssText = 'font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #4caf50;';
 
            const jumpSlider = document.createElement('input');
            jumpSlider.type = 'range'; jumpSlider.min = '5'; jumpSlider.max = '60'; jumpSlider.step = '1';
            jumpSlider.value = jumpForce;
            jumpSlider.style.cssText = 'width: 100%; height: 10px; margin-bottom: 20px; cursor: pointer;';
            jumpSlider.oninput = () => {
                jumpForce = parseFloat(jumpSlider.value);
                localStorage.setItem('ipad_jump_force', jumpForce);
                jumpLabel.innerText = `🦘 Jump Force: ${jumpForce}`;
            };
 
            // --- 速度倍率控制组 ---
            const speedLabel = document.createElement('div');
            speedLabel.innerText = `🏃 Walk Speed: ${speedMultiplier.toFixed(1)}x`; // 标签文本也更新
            speedLabel.style.cssText = 'font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #00bcd4;';
 
            const speedSlider = document.createElement('input');
            speedSlider.type = 'range'; speedSlider.min = '1.0'; speedSlider.max = '3.0'; speedSlider.step = '0.1';
            speedSlider.value = speedMultiplier;
            speedSlider.style.cssText = 'width: 100%; height: 10px; margin-bottom: 20px; cursor: pointer;';
            speedSlider.oninput = () => {
                speedMultiplier = parseFloat(speedSlider.value);
                localStorage.setItem('ipad_speed_multiplier', speedMultiplier);
                speedLabel.innerText = `🏃 Walk Speed: ${speedMultiplier.toFixed(1)}x`; // 标签文本也更新
            };

            // 组装
            panel.appendChild(jumpLabel);
            panel.appendChild(jumpSlider);
            panel.appendChild(speedLabel);
            panel.appendChild(speedSlider);
            
            // 关键改动：挂载到 html 根节点，绝不给游戏画布遮挡的机会
            document.documentElement.appendChild(toggleBtn);
            document.documentElement.appendChild(panel);

            toggleBtn.onclick = (e) => {
                e.preventDefault();
                const isHidden = panel.style.display === 'none';
                panel.style.display = isHidden ? 'block' : 'none';
                toggleBtn.style.borderColor = isHidden ? '#00bcd4' : '#4caf50';
                toggleBtn.innerText = isHidden ? '⚙️' : '⚡';
            };
        }
 
        // 循环检测，确保 UI 不会被游戏清除
        const uiTimer = setInterval(() => {
            if (document.documentElement) {
                createMobileUI();
            }
        }, 500);
    }

    // 强行破防沙盒隔离
    const script = document.createElement('script');
    script.textContent = `(${injectToRealPage.toString()})();`;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
})();
