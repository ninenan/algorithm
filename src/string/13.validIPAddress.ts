// https://leetcode.cn/problems/validate-ip-address/submissions/

const validIPAddress = (ip: string): string => {
  const ipv4RE = /^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/
  const ipv6RE = /^[0-9a-fA-F]{1,4}(\:[0-9a-fA-F]{1,4}){7}$/

  if (ipv4RE.test(ip)) return 'IPv4'
  if (ipv6RE.test(ip)) return 'IPv6'
  
  return 'Neither'
}

export {}