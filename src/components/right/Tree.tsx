import React, { useRef, useEffect, useState } from "react";
import { select, tree, hierarchy, linkVertical } from 'd3';

const Tree = ({ explorer }) => {
  const svgRef = useRef(null);
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('100%');

  const createTree = (data) => {
    if (data.isFolder) {
      return {
        name: data.name,
        children: data.items.map((item) => createTree(item)),
      };
    } else {
      return { name: data.name };
    }
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const root = hierarchy(createTree(explorer.items[2].items[0]));

    const treeData = tree()
      .size([width, height])
      .separation(() => 1)(root);

    const pathGenerator = linkVertical()
      .x((d) => d.x)
      .y((d) => d.y);
    const g = svg.append('g');

    g.selectAll('path')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr("stroke", '#000')
      .attr('fill', 'none')
      .attr('opacity', 1)
      .attr('d', pathGenerator);

    const nodes = g.selectAll("g")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", 5);

    nodes.append("text")
      .text((d) => d.data.name)
      .attr("dy", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "1.00rem");
  }, [explorer, width, height]);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth - 20;
      const maxHeight = window.innerHeight - 20;
      const newWidth = Math.min(maxWidth, 500);
      const newHeight = Math.min(maxHeight, 500);
      setWidth(newWidth);
      setHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [explorer, width, height]);

  return (
    <div style={{ width, height }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    </div>
  );
};

export default Tree;
