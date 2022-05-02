# myReact-query-Firestore-CustomHooks-sandbox
Created with CodeSandbox

Firestoreとreact-queryを両立させるための、customHooksを作成した。
2022/05/02現在、react-queryとfirestoreの連携ライブラリは、
・リアルタイムな更新に対応していない（毎回fetchするしかない） || firebase.v9に対応していない
など問題があった。

よって、react-queryを管理するHooksを作成した。
