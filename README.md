按实力平均分组，可分多组。分组后，每组的实力尽量接近，每组的人数也尽量接近。

示例：

选手数据
```
var players = [
    {
        "player": "a",
        "score": 22
    },
    {
        "player": "b",
        "score": -9
    },
    {
        "player": "c",
        "score": 13
    },
    {
        "player": "d",
        "score": 17
    },
    {
        "player": "e",
        "score": 0
    },
    {
        "player": "f",
        "score": -11
    },
    {
        "player": "g",
        "score": -2
    }
];
```

总共7人，分成两组3v4：
```
new AutoGroup(players, 2).divide();
```
分组结果：
```
[
  [
    {
      "player": "a",
      "score": 22,
      "value": 33
    },
    {
      "player": "e",
      "score": 0,
      "value": 11
    },
    {
      "player": "g",
      "score": -2,
      "value": 9
    },
    {
      "player": "f",
      "score": -11,
      "value": 0
    }
  ],
  [
    {
      "player": "d",
      "score": 17,
      "value": 28
    },
    {
      "player": "c",
      "score": 13,
      "value": 24
    },
    {
      "player": "b",
      "score": -9,
      "value": 2
    }
  ]
]
```
第一组4个人，实力53；第二组3个人，实力54。

分成三组3v2v2：
```
new AutoGroup(players, 3).divide();
```
分组结果：
```
[
  [
    {
      "player": "a",
      "score": 22,
      "value": 33
    },
    {
      "player": "b",
      "score": -9,
      "value": 2
    },
    {
      "player": "f",
      "score": -11,
      "value": 0
    }
  ],
  [
    {
      "player": "c",
      "score": 13,
      "value": 24
    },
    {
      "player": "e",
      "score": 0,
      "value": 11
    }
  ],
  [
    {
      "player": "d",
      "score": 17,
      "value": 28
    },
    {
      "player": "g",
      "score": -2,
      "value": 9
    }
  ]
]
```
第一组3个人，实力35；第二组2个人，实力35；第三组2个人，实力37。