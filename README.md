# Tip Calculator

## 运行
解压完整项目后，双击 `index.html`，使用任意现代浏览器打开即可。不需要 Cursor token、网络、服务器或安装依赖。保持 `index.html` 与 `script.js` 在同一文件夹。

输入账单金额，选择 10%、15% 或 20%，填写人数，然后点击 **Calculate**（也支持 Enter）。金额显示两位小数。人数必须为正整数；0 元账单有效。修改输入后会清除旧结果，避免误读。

## 验证
- 80 / 15% / 3 → tip **12.00**, total **92.00**, per person **30.67**。
- 空账单、负账单 → 提示输入不小于 0 的账单。
- 空人数、0 人、负人数、非整数人数 → 提示输入至少为 1 的整数人数。
- 错误时清空结果并聚焦错误字段，不显示 NaN 或 Infinity。

计算公式：tip = bill × percentage / 100；total = bill + tip；per person = total / people。仅在显示时四舍五入，因此人均显示值乘人数可能与总额相差一分钱。

## Reflection
This project was completed with Codex because Cursor tokens were unavailable. The following describes how I would choose Cursor's tools, rather than claiming that I used them in this session.

- **Fixing a typo:** Tab autocomplete can suggest a small correction while typing; I would review it before accepting.
- **Renaming a variable in one function:** Inline Edit is suitable for a selected scope. I would check that all references inside that function were updated consistently.
- **Understanding someone else's code:** Ask can explain the selected file without changing it.
- **Adding a whole new feature:** Agent can coordinate changes across HTML and JavaScript, followed by review and testing.

The HTML comment gives Tab a concrete description of the desired controls, so its suggestions should better match the intended interface. HTML supplies structure and labels, CSS supplies layout and appearance, and JavaScript makes the Calculate button work.

One AI-generated behavior that needed checking was input validation: JavaScript converts an empty string to zero, so the code explicitly checks for an empty bill before conversion is accepted. I also checked the required 80 / 15% / 3 example and invalid inputs. Empty bills, negative amounts, and zero people are essential edge cases; empty and fractional people are handled too.
