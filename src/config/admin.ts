export const ADMIN_EMAILS = ['aebon@kakao.com', 'radical8566@gmail.com', 'aebon@kyonggi.ac.kr'];

export function isAdmin(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}