class Strack {
  constructor() {
    this.item = []
  }

  // 栈的压入
  push(value) {
    this.item.push(value)
  }

  // 栈的弹出
  pop() {
    this.item.pop()
  }

  // 返回栈顶元素
  peek() {
    let lengthTemp = this.item.length
    return this.item[lengthTemp - 1]
  }

  // 判空
  isEmpty() {
    return this.item.length === 0
  }

  // remove all

  clear() {
    this.item = []
  }

  // sum all items
  size() {
    return this.item.length
  }
}

export default Strack




