import React, { useEffect, useRef, useState } from 'react';
import { Tree, TreeProps } from 'antd';

const AntTree = (
  props: TreeProps & {
    onMounted?: (nodes: any) => void;
  },
) => {
  const { treeData } = props;
  const treeRef = useRef(null);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const keys = getAllKeys(treeData || []);
    setExpandedKeys(keys);
    console.log({ treeData, keys });
  }, [treeData]);

  const getAllKeys = (data: any[]): React.Key[] => {
    return data.reduce((keys: React.Key[], node: any) => {
      keys.push(node.key);
      if (node.children) {
        keys.push(...getAllKeys(node.children));
      }
      return keys;
    }, []);
  };

  return (
    <Tree
      checkable
      defaultExpandAll
      autoExpandParent={autoExpandParent}
      expandedKeys={expandedKeys}
      onExpand={(newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
      }}
      ref={treeRef}
      {...props}
    />
  );
};

export default AntTree;

export const getTreeCheckedNodes = (treeData, checkedKeys = [], halfCheckedKeys = []) => {
  // 将 treeData 转化为一个映射，以便查找节点和其父节点的关系。
  const nodeMap = new Map();
  const parentMap = new Map();
  const checkedSet = new Set(checkedKeys);
  const halfCheckedSet = new Set(halfCheckedKeys);

  // 构建节点映射和父节点映射
  const buildNodeMaps = (data, parentKey = null) => {
    data.forEach((node) => {
      const { key, children } = node;
      nodeMap.set(key, node);
      parentMap.set(key, parentKey);
      if (children) {
        buildNodeMaps(children, key);
      }
    });
  };

  buildNodeMaps(treeData);

  // 处理 checkedKeys 和 halfCheckedKeys
  const processCheckedKeys = (node, key) => {
    if (!node || !node?.children) {
      return;
    }

    const children = node?.children || [];

    const allSiblingsChecked = children.every((child) => checkedSet.has(child.key));
    const allSiblingsUnchecked = children.every((child) => !checkedSet.has(child.key));
    const allSiblingsUncheckedHalf = children.every((child) => !halfCheckedSet.has(child.key));

    if (allSiblingsChecked) {
      // 若节点的子节点全部选中，则节点添加到 checkedSet 中，从 halfCheckedSet 中剔除。
      checkedSet.add(key);
      halfCheckedSet.delete(key);
    } else if (allSiblingsUnchecked && allSiblingsUncheckedHalf) {
      // 若节点的子节点都没有选中，则节点从 checkedSet 和 halfCheckedSet 中剔除。
      checkedSet.delete(key);
      halfCheckedSet.delete(key);
    } else {
      // 若节点的子节点部分选中，则节点从 checkedSet 中剔除，添加到 halfCheckedSet 中。
      checkedSet.delete(key);
      halfCheckedSet.add(key);
    }

    const parentKey = parentMap.get(key);
    if (parentKey) {
      processCheckedKeys(nodeMap.get(parentKey), parentKey);
    }
  };

  // 遍历所有的节点，检查并处理。
  nodeMap.forEach((node, key) => {
    processCheckedKeys(node, key);
  });

  const newCheckedKeys = Array.from(checkedSet);
  const newHalfCheckedKeys = Array.from(halfCheckedSet);

  return {
    checkedKeys: newCheckedKeys.length ? newCheckedKeys : undefined,
    halfCheckedKeys: newHalfCheckedKeys.length ? newHalfCheckedKeys : undefined,
  };
};
