export const formatVND = (amount: string | undefined) => {
  if(amount === undefined) {
    return undefined
  }
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(amount));
};
export function formatVndTo1k(amount: number | undefined): number | undefined {
  // Chia số tiền cho 1000 để chuyển đổi sang đơn vị 1k
  if (amount === undefined) {
    return undefined; // hoặc giá trị mặc định khác tùy theo trường hợp của bạn
  }
  return amount / 1000;
}
