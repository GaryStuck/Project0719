----
### react后台管理

----

+ 第一次先初始化项目 
 ```gitignore
    npm install -g create-react-app : 全局下载
    create-react-app react-admin :下载模板项目 
    cd react-admin 
    npm start 访问: localhost:3000
```

+ 打包流程
```gitignore
    npm run build 
    npm install -g serve 
    serve build
```
+ 使用git推送到远程仓库，创建dev分支用于开发
```gitignore
  git add .
  git commit -m"aaa"
  git push origin master
#创建分支#
  git checkout -b debv
   git push origin dev
#克隆项目到本地后需要将远程分支同步到本地#
git clone url
git checkout -b dev origin/dev
```

+ git注意

```gitignore
输 入 git add * 后出现
warning: LF will be replaced by CRLF in ......  
The file will have its original line endings in your working directory.  

解决方法：
git config --global core.autocrlf false

```

+ webstorm激活码
K6IXATEF43-eyJsaWNlbnNlSWQiOiJLNklYQVRFRjQzIiwibGljZW5zZWVOYW1lIjoi5o
6I5p2D5Luj55CG5ZWGOiBodHRwOi8vaWRlYS5oay5jbiIsImFzc2lnbmVlTmFtZSI6Ii
IsImFzc2lnbmVlRW1haWwiOiIiLCJsaWNlbnNlUmVzdHJpY3Rpb24iOiIiLCJjaGVja0Nv
bmN1cnJlbnRVc2UiOmZhbHNlLCJwcm9kdWN0cyI6W3siY29kZSI6IklJIiwiZmFsbGJhY2t
EYXRlIjoiMjAxOS0wNi0wNSIsInBhaWRVcFRvIjoiMjAyMC0wNi0wNCJ9LHsiY29kZSI6IkFD
IiwiZmFsbGJhY2tEYXRlIjoiMjAxOS0wNi0wNSIsInBhaWRVcFRvIjoiMjAyMC0wNi0wNCJ9LHsiY29k
ZSI6IkRQTiIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDYtMDUiLCJwYWlkVXBUbyI6IjIwMjAtMDYtMDQifSx
7ImNvZGUiOiJQUyIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDYtMDUiLCJwYWlkVXBUbyI6IjIwMjAtMDYtMDQi
fSx7ImNvZGUiOiJHTyIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDYtMDUiLCJwYWlkVXBUbyI6IjIwMjAtMDYtMDQ
ifSx7ImNvZGUiOiJETSIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDYtMDUiLCJwYWlkVXBUbyI6IjIwMjAtMDYtMDQ
ifSx7ImNvZGUiOiJDTCIsImZhbGxiYWNrRGF0ZSI6IjIwMTktMDYtMDUiLCJwYWlkVXBUbyI6IjIwMjAtMDYtMDQi
fSx7ImNvZGUiOiJSUzAiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA2LTA1IiwicGFpZFVwVG8iOiIyMDIwLTA2LTA0In
0seyJjb2RlIjoiUkMiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA2LTA1IiwicGFpZFVwVG8iOiIyMDIwLTA2LTA0In0se
yJjb2RlIjoiUkQiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA2LTA1IiwicGFpZFVwVG8iOiIyMDIwLTA2LTA0In0seyJjb
2RlIjoiUEMiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA2LTA1IiwicGFpZFVwVG8iOiIyMDIwLTA2LTA0In0seyJjb2Rl
IjoiUk0iLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA2LTA1IiwicGFpZFVwVG8iOiIyMDIwLTA2LTA0In0seyJjb2RlIjoi
V1MiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA2LTA1IiwicGFpZFVwVG8iOiIyMDIwLTA2LTA0In0seyJjb2RlIjo
iREIiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA2LTA1IiwicGFpZFVwVG8iOiIyMDIwLTA2LTA0In0seyJjb2RlI
joiREMiLCJmYWxsYmFja0RhdGUiOiIyMDE5LTA2LTA1IiwicGFpZFVwVG8iOiIyMDIwLTA2LTA0In0seyJjb2R
lIjoiUlNVIiwiZmFsbGJhY2tEYXRlIjoiMjAxOS0wNi0wNSIsInBhaWRVcFRvIjoiMjAyMC0wNi0wNCJ9XS
wiaGFzaCI6IjEzMjkyMzI4LzAiLCJncmFjZVBlcmlvZERheXMiOjcsImF1dG9Qcm9sb25nYXRlZCI6ZmFsc2Us
ImlzQXV0b1Byb2xvbmdhdGVkIjpmYWxzZX0=-KUaQi549fH96M/qU7jTvuMeq2GuedA+WppV3irI0JHlfDuhJli
dK2m3yoRxitGNmimPFVUA8Dk38OzXnP29I39QDXH5VAF8VjOP0XrqdfrpaZUKpdhRaYz8r1NA
wID75U4LqYCvFbazka1dCMJBFqJ2wum1+CSQhJ1O7CSchAJAbjcCRQjbU2sXOofAA2sPLi7nlJw2
wrjOHzH9cOczUn11n24PE9BQ/oYGITHkzsu94i4Q90Z1jQysMtXLgM/HoLSHY2T9rKU
LLoh+tdMwBp9+m0VLF/R5gdkVDV/dlorrA9OEZIsSOaG+oWSen/AulKH6OXllZJoR+b
/T6YYfGWg==-MIIElTCCAn2gAwIBAgIBCTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQ
DDA1KZXRQcm9maWxlIENBMB4XDTE4MTEwMTEyMjk0NloXDTIwMTEwMjEy
Mjk0NlowaDELMAkGA1UEBhMCQ1oxDjAMBgNVBAgMBU51c2xlMQ8wDQYDVQQHDAZ
QcmFndWUxGTAXBgNVBAoMEEpldEJyYWlucyBzLnIuby4xHTAbBgNVBAMMFHByb2QzeS1mcm9tLTIwMTgxMTA
xMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxcQkq+zdxlR2mmRYBPzGbUNdMN6OaXiXzxIWtMEkrJMO
/5oUfQJbLLuMSMK0QHFmaI37WShyxZcfRCidwXjot4zmNBKnlyHodDij/78TmVqFl8nOeD5+07B8VEaIu7c3E1N+e1d
oC6wht4I4+IEmtsPAdoaj5WCQVQbrI8KeT8M9VcBIWX7fD0fhexfg3ZRt0xqwMcXGNp3DdJHiO0rCdU+Itv7EmtnSV
q9jBG1usMSFvMowR25mju2JcPFp1+I4ZI+FqgR8gyG8oiNDyNEoAbsR3lOpI7grUYSvkB/xVy/VoklPCK2h0f0GJxF
jnye8NT1PAywoyl7RmiAVRE/EKwIDAQABo4GZMIGWMAkGA1UdEwQCMAAwHQYDVR0OBBYEFGEpG9oZGcfLMGNBkY7S
gHiMGgTcMEgGA1UdIwRBMD+AFKOetkhnQhI2Qb1t4Lm0oFKLl/GzoRykGjAYMRYwFAYDVQQDDA1KZXRQcm9maWxlI
ENBggkA0myxg7KDeeEwEwYDVR0lBAwwCgYIKwYBBQUHAwEwCwYDVR0PBAQDAgWgMA0GCSqGSIb3DQEBCwUAA4ICA
QAF8uc+YJOHHwOFcPzmbjcxNDuGoOUIP+2h1R75Lecswb7ru2LWWSUMtXVKQzChLNPn/72W0k+oI056tgiwuG7M4
9LXp4zQVlQnFmWU1wwGvVhq5R63Rpjx1zjGUhcXgayu7+9zMUW596Lbomsg8qVve6euqsrFicYkIIuUu4zYP
ndJwfe0YkS5nY72SHnNdbPhEnN8wcB2Kz+OIG0lih3yz5EqFhld03bGp222ZQCIghCTVL6QBNadGsiN/lWLl4
JdR3lJkZzlpFdiHijoVRdWeSWqM4y0t23c92HXKrgppoSV18XMxrWVdoSM3nuMHwxGhFyde05OdDtLpCv+jlWf5REAH
HA201pAU6bJSZINyHDUTB+Beo28rRXSwSh3OUIvYwKNVeoBY+KwOJ7WnuTCUq1meE6GkKc4D/cXmgpOyW/1SmBz3XjVI
i/zprZ0zf3qH5mkphtg6ksjKgKjmx1cXfZAAX6wcDBNaCL+Ortep1Dh8xDUbqbBVNBL4jbiL3i3xsfNiyJgaZ5sX7i8t
mStEpLbPwvHcByuf59qJhV/bZOl8KqJBETCDJcY6O2aqhTUy+9x93ThKs1GKrRPePrWPluud7ttlgtRveit/pcBrnQcXO
l1rHq7ByB8CFAxNotRUYL9IF5n3wJOgkPojMy6jetQA5Ogc8Sm7RG6vg1yow==

----

### 分页列表

+ 1.纯前台分页
   - 请求获取数据：一次获取所有数据，翻页时不需要发请求
   - 请求接口:
        不需要指定：页码（pageNum）和每页数量(pageSize)
        相应数据：所有数据的数组
        
+ 2.基于后台的分页
   - 请求获取数据：每次只获取当前页的数据，翻页时需要重新发请求
   - 请求接口:
        需要指定参数:页码(pageNum)和每页数量(pageSize)
        相应数据：当前页数据的数组 + 总记录数（total）
        
+ 3.如何选择？

    - 根据数据的多少来选择
