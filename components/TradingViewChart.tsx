// components/TradingViewChart.tsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewChart() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Clean up any existing TradingView widget script
        const existingScript = document.getElementById('tradingview-chart-script');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.id = 'tradingview-chart-script';
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;

        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: 'PYTH:HYPEUSD', // ✅ Default to HYPE/USD
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: '1',
            locale: 'en',
            withdateranges: true,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            details: true,
            support_host: 'https://www.tradingview.com'
        });

        if (containerRef.current) {
            const widgetContainer = containerRef.current.querySelector('.tradingview-widget-container__widget');
            if (widgetContainer) {
                widgetContainer.appendChild(script);
            }
        }

        return () => {
            if (script) script.remove();
        };
    }, []);

    return (
        <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
            <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
}

export default memo(TradingViewChart);
