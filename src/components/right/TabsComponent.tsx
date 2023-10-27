import React, { useRef, useEffect, useState } from "react";
import { select, tree, hierarchy, linkVertical } from 'd3';

const Tree = ({ explorer }) => {
  const svgRef = useRef(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500); // Set an initial height
  const zoomContainer = useRef(null);

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

  const calculateTreeHeight = (node) => {
    if (!node.children) return 1;
    const childHeights = node.children.map(calculateTreeHeight);
    return 1 + Math.max(...childHeights);
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const root = hierarchy(createTree(explorer.items[2].items[0]));

    const treeHeight = calculateTreeHeight(root);
    const newHeight = treeHeight * 100; // Adjust the factor to control the height

    const treeData = tree()
      .size([width, newHeight])
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
      .attr('stroke-width', 1)
      .attr('d', pathGenerator);

    const nodes = g.selectAll("g")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", 10);

    nodes.append("text")
      .text((d) => d.data.name)
      .attr("dy", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "0.75rem");

    svg.attr('width', width).attr('height', newHeight);
    setHeight(newHeight);
  }, [explorer, width]);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth - 20;
      const newWidth = Math.min(maxWidth, 500);
      setWidth(newWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [explorer, width]);

  return (
    <div style={{ width, height }}>
      <svg ref={svgRef}>
        <g ref={zoomContainer}></g>
      </svg>
    </div>
  );
};

export default Tree;
