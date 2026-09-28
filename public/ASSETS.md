# 素材来源

- `soundtrack.m4a`：从本次用户提供的 30 秒参考视频中提取，保留原音轨编码，限制为片段画面时长。仅用于此复刻项目。原音轨版权不因仓库公开而转让，代码的 MIT 许可不适用于音轨。
- `handwriting.woff2`：霞鹜文楷繁体版常规字重的字符子集，覆盖当前组件中的文字。上游：[Google Fonts 中的 LXGW WenKai TC](https://github.com/google/fonts/tree/main/ofl/lxgwwenkaitc)，原字体文件 `LXGWWenKaiTC-Regular.ttf`，许可随附于 `OFL.txt`。字体支持所需的简体汉字；该变体是字体包名称。
- 四种素材缩略图、手机内容、机器人、边框、图标、波形与粒子：由本仓库内 React／SVG 代码生成，无外部图像依赖。音乐轨道的波形是示意绘图；它不作为真实声音幅值分析使用。

需要扩充汉字时，可从上述上游下载完整字体，转换为 WOFF2 后替换 `handwriting.woff2`，或者将 `src/font.css` 改为读取完整 TTF。请保留字体许可。
