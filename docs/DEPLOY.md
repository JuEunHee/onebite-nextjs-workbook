# VERCEL 배포

```shell
# Vercel 설치 및 로그인
$ sudo npm install -g vercel
$ vercel login

# 배포해줘
$ vercel
```

완료되면 배포된 주소 보여짐

배포완료 후 수정사항이 생기면 재배포하면 되고,
production 모드로 하고싶다면 아래와 같이 `--prod` 옵션을 주면 된다.

```shell
$ vercel --prod
```