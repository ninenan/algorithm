// PercentageParser<StringTypes>
// 实现类型 PercentageParser。根据规则 /^(\+|\-)?(\d*)?(\%)?$/ 匹配类型 T。
// 匹配的结果由三部分组成，分别是：[正负号, 数字, 单位]，如果没有匹配，则默认是空字符串。
type Suffix<T extends string> = T extends `${infer S}%` ? [S, "%"] : [T, ""];
type Prefix<T extends string> = T extends "+" | "-" ? T : never;

type PercentageParser<T extends string> = T extends `${Prefix<
  infer S
>}${infer U}`
  ? [S, ...Suffix<U>]
  : ["", ...Suffix<T>];

type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1> // expected ['', '', '']
type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
type R5 = PercentageParser<PString5> // expected ["", "85", ""]

export {};
