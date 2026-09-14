import { prisma } from "@/lib/prisma";

export async function verifyAdmin(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin || admin.password !== password) return null;
  return admin;
}

export async function getAdminByUsername(username: string) {
  return prisma.admin.findUnique({ where: { username } });
}

export async function updateAdminPassword(username: string, newPassword: string) {
  return prisma.admin.update({
    where: { username },
    data: { password: newPassword },
  });
}