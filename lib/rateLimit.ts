// lib/rateLimit.ts
const userLimits = new Map<string, {
    count: number,
    resetTime: number
  }>();
  
  const DAILY_LIMIT = 3; // 1日の制限回数
  const RESET_INTERVAL = 1 * 60 * 60 *1000; // 1時間（ミリ秒）
  // const RESET_INTERVAL = 2 * 60 *1000; // 2分（ミリ秒）
  
  export function checkRateLimit(userId: string): boolean {
    const now = Date.now();
    const userLimit = userLimits.get(userId);
  
    if (!userLimit) {
      // 初回アクセス
      userLimits.set(userId, {
        count: 1,
        resetTime: now + RESET_INTERVAL
      });
      return true;
    }
  
    if (now > userLimit.resetTime) {
      // リセット時間を過ぎていた場合
      userLimits.set(userId, {
        count: 1,
        resetTime: now + RESET_INTERVAL
      });
      return true;
    }
  
    if (userLimit.count >= DAILY_LIMIT) {
      return false;
    }
  
    // カウントを増やす
    userLimit.count += 1;
    userLimits.set(userId, userLimit);
    return true;
  }