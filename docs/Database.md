# 数据表

### StdData

| StdID (PK) | StdName | 
|------------|---------|

[//]: # (ATLoginCheck 默认值为当前时间戳，用于校验AccessToken，实现AT自动过期)

```SQL
CREATE TABLE StdData(
StdID TEXT PRIMARY KEY,
StdName TEXT); 
```

#### 示例插入

```SQL
INSERT INTO StdData(StdID, StdName)
VALUES('StdID' ,'张三');
```