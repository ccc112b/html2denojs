// 狀態機率： P(a) = 0.2, P(b) = 0.8
// 轉移機率： P(x => y)
//    a   b
// a  0.7 0.3
// b  0.5 0.5
export const P = {
  'a': 0.2, 'b': 0.8,
  'a=>a': 0.7, 'a=>b':0.3,
  'b=>a': 0.5, 'b=>b':0.5,
}

export default P;
