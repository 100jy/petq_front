## How to Start

1. Node.js 및 npm 설치
    React 애플리케이션을 개발하려면 Node.js와 npm(Node Package Manager)을 먼저 설치해야 합니다.

   -  [Node.js 공식 사이트](https://nodejs.org/en)에서 최신 LTS(Long Term Support) 버전을 다운로드하여 설치합니다. 

    - 설치 후 터미널에서 node -v와 npm -v 명령어를 입력하여 Node.js와 npm이 올바르게 설치되었는지 확인합니다.
        ```bash
        node -v
        npm -v
        ```
2. chat-stream module update
```
cd petq_front
git submodule update --remote # update submodules
```

3. app 실행
    ```bash
    # repo clone
    git clone https://github.com/100jy/petq_front.git
    
    # app 위치로 이동
    cd .../petq/petq
    
    # 필수 depen 설치 
    npm install
    npm install @react-oauth/google

    # app 실행
    npm start
    ```
