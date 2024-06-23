class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.start = 0;
    this.end = array.length - 1;
    this.root = this.buildTree(array, this.start, this.end);
    this.preOrderData = [];
    this.inOrderData = [];
    this.postOrderData = [];
    prettyPrint(this.root);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  insert(data, root = this.root) {
    if (root === null) {
      return (root = new Node(data));
    }
    if (root.data < data) {
      root.right = this.insert(data, root.right);
    } else {
      root.left = this.insert(data, root.left);
    }
    prettyPrint(this.root);
    return root;
  }

  delete(data) {
    const deleteNode = function (node, data) {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        // if node has no children
        if (node.left === null && node.right === null) {
          return null;
        }
        // if node has no left children
        if (node.left === null) {
          return node.right;
        }
        // if node has no right children
        if (node.right === null) {
          return node.left;
        }
        // if node has two children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = deleteNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else {
        node.right = deleteNode(node.right, data);
        return node;
      }
    };
    this.root = deleteNode(this.root, data);
    prettyPrint(this.root);
  }

  find(data) {
    let current = this.root;
    console.log(current);
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    if (current === null) {
      return null;
    }
    prettyPrint(current);
    return current;
  }

  levelOrder(root = this.root) {
    const queue = [];
    const result = [];
    if (root === null) return;

    queue.push(root);

    while (queue.length > 0) {
      let current = queue.shift(root);
      result.push(current.data);
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    console.log("Level order is:", result);
    return result;
  }

  inOrder(root = this.root) {
    if (root === null) return;

    if (root.left != null) {
      this.inOrder(root.left);
    }
    if (root.data !== undefined) {
      this.inOrderData.push(root.data);
    }
    if (root.right !== null) {
      this.inOrder(root.right);
    }
    console.log("The tree in order:", this.inOrderData);
  }

  preOrder(root = this.root) {
    if (root === null) return;

    if (root.data !== undefined) {
      this.preOrderData.push(root.data);
    }
    if (root.left != null) {
      this.preOrder(root.left);
    }
    if (root.right !== null) {
      this.preOrder(root.right);
    }
    console.log("The tree in pre-order:", this.preOrderData);
  }

  postOrder(root = this.root) {
    if (root === null) return;

    if (root.left != null) {
      this.postOrder(root.left);
    }
    if (root.right !== null) {
      this.postOrder(root.right);
    }
    if (root.data !== undefined) {
      this.postOrderData.push(root.data);
    }
    console.log("The tree in post-order:", this.postOrderData);
  }

  height(root = this.root) {
    if (root === null) {
      return -1;
    } else {
      let left = this.height(root.left);
      let right = this.height(root.right);
      return Math.max(left, right) + 1;
    }
  }

  depth(value, root = this.root, count = 0) {
    if (root === null) return;
    if (root.data === value) return count;

    if (root.data < value) {
      return this.depth(value, root.right, count + 1);
    } else {
      return this.depth(value, root.left, count + 1);
    }
  }

  isBalanced(root = this.root) {
    if (root === null) return false;

    let leftHalf = root.left;
    let rightHalf = root.right;

    if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
      return false;
    } else {
      return true;
    }
  }

  rebalance() {
    prettyPrint(this.root);
    if (this.isBalanced(this.root)) return this.root;

    let rebalancedTreeArray = [];
    rebalancedTreeArray = this.traverse(this.root, rebalancedTreeArray);
    console.log(rebalancedTreeArray);

    let balancedTree = new Tree(rebalancedTreeArray);
    return balancedTree.root;
  }

  traverse(root, array) {
    if (array !== undefined) array.push(root.data);
    if (root.left !== null) {
      this.traverse(root.left, array);
    }
    if (root.right !== null) {
      this.traverse(root.right, array);
    }
    return array;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const orderedArray = [0, 2, 26, 29, 37, 63, 70, 73, 76, 86, 88, 92, 94];
console.log(orderedArray);

const tree = new Tree(orderedArray);
console.log(tree.levelOrder());
tree.inOrder();
tree.preOrder();
tree.postOrder();
console.log(tree.height());
console.log(tree.depth(63));
console.log(tree.isBalanced());

tree.insert(123);
tree.insert(214);
tree.insert(325);

console.log(tree.height());
console.log(tree.isBalanced());
const newTree = tree.rebalance();
console.log(tree.isBalanced(newTree));
