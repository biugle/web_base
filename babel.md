# Babel Plugin List

- `@babel/plugin-syntax-async-generators`：添加对异步生成器语法的支持，包括 `async function*` 和 `for await...of` 等。
  示例代码：

```javascript
  async function* generateData() {
    yield await fetchData1();
    yield await fetchData2();
    yield await fetchData3();
  }

  (async () => {
    for await (const data of generateData()) {
      console.log(data);
    }
  })();

```

- `@babel/plugin-syntax-bigint`：添加对 BigInt 类型的支持，允许你使用大整数。
  示例代码：

```javascript
  const bigNumber = 9007199254740991n;
  const result = bigNumber ** 2n;
  console.log(result.toString());

```

- `@babel/plugin-syntax-class-properties`：添加对类属性语法的支持，允许你在类中使用属性初始化器语法。
  示例代码：

```javascript
  class MyClass {
    static staticProperty = 'Hello';
    instanceProperty = 'World';
  }

  console.log(MyClass.staticProperty);
  const instance = new MyClass();
  console.log(instance.instanceProperty);

```

- `@babel/plugin-syntax-import-meta`：添加对 `import.meta` 元数据的支持，允许你访问模块的元数据信息。
  示例代码：

```javascript
  console.log(import.meta.url);
  console.log(import.meta.env);

```

- `@babel/plugin-syntax-json-strings`：添加对 JSON 字符串语法的支持，允许你在字符串中使用特殊的转义序列。
  示例代码：

```javascript
  const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
  const parsedObject = JSON.parse(jsonString);
  console.log(parsedObject);

```

- `@babel/plugin-syntax-logical-assignment-operators`：添加对逻辑赋值运算符 (`&&=`, `||=`, `??=`) 的支持。
  示例代码：

```javascript
  let x = 5;
  x &&= 10;
  console.log(x); // 输出：10

  let y = null;
  y ??= 20;
  console.log(y); // 输出：20

```

- `@babel/plugin-syntax-nullish-coalescing-operator`：添加对空值合并运算符 (`??`) 的支持。
  示例代码：

```javascript
  const value = null ?? 'default value';
  console.log(value); // 输出：'default value'

```

- `@babel/plugin-syntax-numeric-separator`：添加对数字分隔符 (`_`) 的支持，允许你在数字中添加下划线以提高可读性。
  示例代码：

```javascript
  const billion = 1_000_000_000;
  const pi = 3.14_15_92;
  console.log(billion);
  console.log(pi);

```

- `@babel/plugin-syntax-object-rest-spread`：添加对对象解构和扩展语法的支持，包括对象的展开和剩余属性。
  示例代码：

```javascript
  const obj1 = { x: 1, y: 2 };
  const obj2 = { ...obj1, z: 3 };
  console.log(obj2); // 输出：{ x: 1, y: 2, z: 3 }

  const { x, ...rest } = obj2;
  console.log(x); // 输出：1
  console.log(rest); // 输出：{ y: 2, z: 3 }

```

- `@babel/plugin-syntax-optional-catch-binding`：添加对可选的 `catch` 绑定语法的支持，允许你在 `catch` 语句中省略错误参数。
  示例代码：

```javascript
  try {
    // 可能会抛出错误的代码
  } catch {
    // 在不指定错误参数的情况下处理错误
    console.log("发生了错误");
  }

```

- `@babel/plugin-syntax-optional-chaining`：添加对可选链操作符 (`?.`) 的支持，允许你在访问可能为 `null` 或 `undefined` 的属性时避免出现错误。
  示例代码：

```javascript
  const obj = {
    property1: {
      property2: {
        value: 42
      }
    }
  };

  const value = obj?.property1?.property2?.value;
  console.log(value); // 输出：42

  const nonExistentValue = obj?.property3?.property4?.value;
  console.log(nonExistentValue); // 输出：undefined

```

- `@babel/plugin-syntax-top-level-await`：添加对顶层 `await` 语法的支持，允许在模块顶层直接使用 `await` 关键字。
  示例代码：

```javascript
  const fetchData = async () => {
    // 异步获取一些数据
  };

  await fetchData();

```

- `@babel/plugin-proposal-class-properties`：提案阶段的插件，用于支持在类中使用属性初始化器语法，允许你在类中直接声明和初始化属性。

  示例代码：

```javascript
  class MyClass {
    static staticProperty = 'Hello';
    instanceProperty = 'World';
  }

  console.log(MyClass.staticProperty);
  const instance = new MyClass();
  console.log(instance.instanceProperty);

```

- `@babel/plugin-proposal-decorators`：提案阶段的插件，为 JavaScript 添加装饰器语法，允许你通过装饰器修改类和类成员的行为。

  示例代码：

```javascript
  @decorator
  class MyClass {
    @readonly
    property = 123;

    @log
    method() {
      // 方法逻辑
    }
  }

```

- `@babel/plugin-transform-arrow-functions`：将箭头函数转换为普通函数的插件。

  示例代码：

```javascript
  // 转换前
  const sum = (a, b) => a + b;

  // 转换后
  const sum = function(a, b) {
    return a + b;
  };

```

- `@babel/plugin-transform-async-to-generator`：将 async/await 转换为使用生成器函数的形式的插件。

  示例代码：

```javascript
  // 转换前
  async function fetchData() {
    const result = await fetch('https://api.example.com/data');
    return result.json();
  }

  // 转换后
  function fetchData() {
    return regeneratorRuntime.async(function fetchData$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return fetch('https://api.example.com/data');

          case 2:
            return _context.abrupt('return', _context.sent.json());

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    });
  }

```

- `@babel/plugin-transform-destructuring`：将解构语法转换为相应的赋值语句的插件。

  示例代码：

```javascript
  // 转换前
  const { firstName, lastName } = person;

  // 转换后
  const firstName = person.firstName;
  const lastName = person.lastName;

```

- `@babel/plugin-transform-classes`：将类语法转换为 ES5 的构造函数形式的插件。

  示例代码：

```javascript
  // 转换前
  class MyClass {
    constructor(name) {
      this.name = name;
    }

    sayHello() {
      console.log(`Hello, ${this.name}!`);
    }
  }

  // 转换后
  function MyClass(name) {
    this.name = name;
  }

  MyClass.prototype.sayHello = function() {
    console.log('Hello, ' + this.name + '!');
  };

```

- `@babel/plugin-transform-modules-commonjs`：将 ES6 模块转换为 CommonJS 模块的插件。

  示例代码：

```javascript
  // 转换前
  import { add, subtract } from './math';

  // 转换后
  const math = require('./math');
  const add = math.add;
  const subtract = math.subtract;

```

- `@babel/preset-env`：根据目标环境自动选择需要的插件和转换规则的预设。

- `@babel/preset-typescript`：用于转换 TypeScript 代码的预设。

- `@babel/preset-react`：用于转换 React JSX 语法的预设。

- `@babel/core`：Babel 的核心包，提供了转换 JavaScript 代码的功能，管理插件和预设，并将代码转换为目标环境所支持的版本。
