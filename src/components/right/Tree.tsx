import React, { useRef, useEffect, useState } from "react";
import { select, tree, hierarchy, linkVertical, linkHorizontal } from 'd3';

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

  const setTreeNodePositions = (node) => {
    let x = 0;
    let y = 0;

    if (node.children) {
      // Adjust the x position based on the children
      node.children.forEach((child) => {
        setTreeNodePositions(child);
        x += child.x;
      });
      x /= node.children.length;
    }

    // Update the x and y positions for the current node
    node.x = x;
    node.y = y;

    return node;
  };

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth - 20;
      const maxHeight = window.innerHeight - 20;
      const newWidth = Math.min(maxWidth, 700);
      const newHeight = Math.min(maxHeight, 800);
      setWidth(newWidth);
      setHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const root = hierarchy(createTree(explorer.items[2].items[0]));

    // Set the initial positions of tree nodes
    setTreeNodePositions(root);

    const treeLayout = tree()
      .size([height, width]);

    const treeData = treeLayout(root);

    const pathGenerator = linkHorizontal()
      .x((d) => d.y + 40)
      .y((d) => d.x);

    const g = svg.append('g');

    g.selectAll('path')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr("stroke", 'white')
      .attr('fill', 'none')
      .attr('opacity', 1)
      .attr('d', pathGenerator);

    const nodes = g.selectAll("g")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.y + 40},${d.x})`);

    nodes.append("circle")
      .attr("r", 5)
      .style('fill', 'white')

    nodes.append("text")
      .text((d) => d.data.name)
      .attr("dy", 20)
      .attr('dx', -20)
      .attr("text-anchor", "middle")
      .attr("fill", '#bdbdbd')

      .style("font-size", "1.00rem");
  }, [explorer, width, height]);

  const treeStyles = {
    height: '800px',
    width: '100%',
 };

  return (
    <div >
      <svg ref={svgRef} style={treeStyles}></svg>
    </div>
  );
};

export default Tree;
