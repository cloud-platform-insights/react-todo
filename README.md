# todo

Simple web app built with React, Express/Node, PostgreSQL. 

Source material: https://github.com/mderus/todolist-react-node-mysql


## reproducing postgres steps 

```
sudo mkdir -p /usr/local/var/postgres
sudo chown -R $(whoami) /usr/local/var/postgres

initdb /usr/local/var/postgres
brew services start postgresql

createdb todo
psql todo

----


CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE todo TO myuser;

CREATE TABLE todos (
  id UUID PRIMARY KEY,
  todo TEXT NOT NULL
);
GRANT ALL PRIVILEGES ON TABLE todos TO myuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;
```