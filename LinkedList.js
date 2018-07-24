class LinkedList {
  constructor(...values) {
    this._head = null;
    this._tail = null;
    this._length = 0;

    values.forEach(value => {
      this.addToTail(value);
    })
  }

  addToHead(value) {
    let node = new Node(value, null, null);

    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      this._head.prev = node;
      node.next = this._head;
      this._head = node;
    }

    this._length++;
    return node;
  }

  addToTail(value) {
    let node = new Node(value, null, null);

    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }

    this._length++;
    return node;
  }

  removeFromHead() {
    if (this._length === 0) {
      throw new Error("no nodes to remove");
    }

    let value = this._head.value;
    this._head = this._head.next;
    this._head.prev = null;
    this._length--;

    return value;
  }

  removeFromTail() {
    if (this._length === 0) {
      throw new Error("no nodes to remove");
    }

    let value = this._tail.value;
    this._tail = this._tail.prev;
    this._tail.next = null;
    this._length--;

    return value;
  }

  removeVal(term) {
    if (this._length < 1) {
      throw new Error("no nodes to remove");
    }

    if (this._head.value === term) {
      return this.removeFromHead();
    }

    if (this._tail.value === term) {
      return this.removeFromHead();
    }

    let currentNode = this._head;
    let previousNode = null;

    while (currentNode) {
      if (currentNode.value === term) {
        previousNode.next = currentNode.next;
        previousNode.next.prev = previousNode;
        this._length--;
        return currentNode.value;
      }

      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    return null;
  }

  remove(position) {
    if (position < 0 || position > this._length - 1) {
      throw new Error("non-existent node at position " + position);
    }

    let currentNode = this._head;

    if (position === 0) {
      return this.removeFromHead();
    }

    if (position === this.length - 1) {
      return this.removeFromTail();
    }

    let count = 0;
    let prevNode = null;

    while (count < position) {
      prevNode = currentNode;
      currentNode = currentNode.next;
      count++;
    }

    prevNode.next = currentNode.next;
    prevNode.next.prev = prevNode;
    this._length--;

    return currentNode.value;
  }

  get(position) {
    if (position < 0 || position > this._length - 1) {
      throw new Error("non-existent node at position " + position);
    }

    let currentNode = this._head;
    let count = 0;

    while (count < position) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  find(term) {
    let currentNode = this._head;
    while (currentNode) {
      if (currentNode.value === term) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  update(position, val) {
    if (position < 0 || position > this._length - 1) {
      throw new Error("non-existent node at position " + position);
    }

    if (position === 0) {
      this._head.value = val;
      return this._head;
    }

    if (position === this.length - 1) {
      this._tail.value = val;
      return this._tail
    }

    let currentNode = this._head;
    let count = 0;

    while (count < position) {
      currentNode = currentNode.next;
      count++;
    }

    currentNode.value = val;
    return currentNode;
  }

  start() {
    return this._head;
  }

  end() {
    return this._tail;
  }

  getLength() {
    return this._length;
  }

  includes(term) {
    let currentNode = this._head;
    while (currentNode) {
      if (currentNode.value === term) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  indexOf(term) {
    let currentNode = this._head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value === term) {
        return index;
      }
      currentNode = currentNode.next;
      index++;
    }
    return -1;
  }

  toArray() {
    let arr = [];
    let currentNode = this._head;

    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return arr;
  }

  forEach(func) {
    let currentNode = this._head;
    let i = 0;

    while (currentNode) {
      func(currentNode.value, i);
      currentNode = currentNode.next;
      i++;
    }
  }

  map(func) {
    let newList = new LinkedList();

    this.forEach(item => {
      newList.addToTail(func(item));
    })

    return newList;
  }

  filter(func) {
    let newList = new LinkedList();

    this.forEach(item => {
      if (func(item)) {
        newList.addToTail(item);
      }
    });

    return newList;
  }

  search(func) {
    let currentNode = this._head;
    while (currentNode) {
      if (func(currentNode.value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  reduce(func, startValue) {
    let acc = startValue || this._head.value;

    if (!startValue) {
      this.forEach((item, i) => {
        if (i === 0) return;
        acc = func(acc, item);
      });
    } else {
      this.forEach((item) => {
        acc = func(acc, item);
      });
    }

    return acc;
  }

  toString() {
    return this.toArray().join(", ");
  }

  [Symbol.iterator]() {
    let currentNode = this._head;

    return {
      next: () => {
        let thisNode = currentNode;

        if (thisNode) {
          currentNode = currentNode.next;
          return {
            value: thisNode.value,
            done: false
          }
        } else {
          return {
            done: true
          }
        }
      }
    };
  }
}

class Node {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

// export default LinkedList;
