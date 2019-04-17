


## Nginx默认配置语法
user: 使用用户 (没有必要不用改)
worker-processes： 工作进程数
error_log 错误日志
pid  服务启动时候Pid

event: worker_connections 每个进程允许最大连接数
        use 工作进程数
http {
    server {
        listen: 80;
        server_name: localhost; (主机名或者域名)
      
      location /{
          root  /usr/share/nginx/html
          index.html index.htm
      }

      error_page 500 502 503 504 /50x.html     //错误页面
      location = /50.html{
         root /usr/share/nginx/html
      }
          
    }
}



### bootstrap笔记
## 1 面板控件： panel
## 2 控制按钮大小 btn btn-default , btn-danger  