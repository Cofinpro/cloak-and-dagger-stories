(function () {
    const nodes = document.getElementsByClassName('uml');

    let config = Reveal.getConfig().nomnoml;
    const option_prefix = appendOptions(config);

    for (let i = 0, len = nodes.length; i < len; i++) {
        const source = option_prefix + decodeURI(nodes[i].textContent).trim();
        let node = nodes[i];
        if (config['renderMode'] === 'svg') {
            node.innerHTML = nomnoml.renderSvg(source);
            let svg = node.getElementsByTagName('svg')[0];
            svg.removeAttribute('height');
            svg.removeAttribute('width');
        } else {
            let canvas = document.createElement('canvas');
            nomnoml.draw(canvas, source);
            node.textContent = '';
            node.appendChild(canvas)
        }
    }

    Reveal.layout();

    function appendOptions(options) {
        let result = "";
        Object.entries(options).forEach(([key, value]) => {
            result += `#${key}: ${value}\n`
        });
        return result;
    }

})();
