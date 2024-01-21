/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState, useCallback } from 'react';
import {
  select,
  tree,
  zoom,
  hierarchy,
  HierarchyPointNode,
  linkHorizontal,
} from 'd3';

const Tree = ({ srcApp }) => {
  const svgRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [resetView, setResetView] = useState(false);

  const createTree = useCallback((data) => {
    if (data.isFolder) {
      return {
        name: data.name,
        isFolder: data.isFolder,
        children: data.items.map((item) => createTree(item)),
      };
    } else {
      return { name: data.name };
    }
  }, []);

  const setTreeNodePositions = useCallback((node) => {
    let x = 0;
    const y = 0;

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
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth - 20;
      const maxHeight = window.innerHeight - 20;
      const newWidth = Math.min(maxWidth, 800);
      const newHeight = Math.min(maxHeight, 700);
      setWidth(newWidth);
      setHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    const root = hierarchy(createTree(srcApp));

    // Set the initial positions of tree nodes
    setTreeNodePositions(root);

    const treeLayout = tree().size([height, width]);

    const treeData: HierarchyPointNode<any> = treeLayout(root);

    const pathGenerator = linkHorizontal()
      .x((d) => d.y + 40)
      .y((d) => d.x);

    // const pathGenerator = (d: any) => {
    //   return `M${d.source.y + 40},${d.source.x}L${d.target.y + 40},${
    //     d.target.x
    //   }`;
    // };
    const g = svg.append('g');

    g.selectAll('path')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('stroke', 'white')
      .attr('fill', 'none')
      .attr('opacity', 1)
      .attr('d', pathGenerator);

    const nodes = g
      .selectAll('g')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.y + 40},${d.x})`);

    nodes
      .append('circle')
      .attr('r', 5)
      .style('fill', (d) => (d.data.isFolder ? 'yellow' : 'white')); // Change node fill color based on isFolder property

    nodes
      .append('text')
      .text((d) => d.data.name)
      .attr('dy', 20)
      .attr('dx', -20)
      .attr('text-anchor', 'middle')
      .attr('fill', (d) => (d.data.isFolder ? 'yellow' : '#bdbdbd'))
      .style('font-size', '1.00rem');

    const zoomBehavior = zoom()
      .scaleExtent([0.5, 10]) // Set the zoom scale extent
      .on('zoom', (event) => {
        g.attr('transform', event.transform); // Apply the zoom transform to the entire tree
      });

    svg.call(zoomBehavior);
  }, [width, height, srcApp, resetView, createTree, setTreeNodePositions]);

  const treeStyles = {
    height: '100%',
    width: '100%',
    // overflowY:'hidden',
  };

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <button
        className=''
        onClick={() => setResetView(!resetView)}
        style={{
          color: 'white',
          marginLeft: '10px',
          border: '2px solid rgba(229, 63, 115)',
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '1%',
          borderRadius: '10px',
          fontSize: '1.35rem',
        }}
      >
        Reset View
      </button>

      <svg ref={svgRef} style={treeStyles}></svg>
    </div>
  );
};

export default Tree;
