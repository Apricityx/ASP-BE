# 数据表

### StdData

| StdID (PK) | StdName | StdPasswd | ATLoginCheck |
|------------|---------|-----------|--------------|

ATLoginCheck 默认值为当前时间戳，用于校验AccessToken，实现AT自动过期

```SQL
CREATE TABLE StdData(
StdID TEXT PRIMARY KEY,
StdName TEXT,
StdPasswd TEXT,
ATLoginCheck TIMESTAMP DEFAULT CURRENT_TIMESTAMP); 
```

#### 示例插入

```SQL
INSERT INTO StdData(StdID, StdName, StdPasswd)
VALUES('StdID' ,'张三', '123456');
```