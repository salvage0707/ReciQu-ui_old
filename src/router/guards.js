// 初期登録チェック
export const userInitGuard = (to, next, authService) => {
  // Firebase認証のみ完了している場合(バックエンドのユーザー登録をしていない)
  if (authService.isAuthenticated && !authService.user) {
    next({
      path: "/users/new",
      query: { redirect: to.fullPath }
    });
    return true;
  }
};

// 認証チェック
export const authGuard = (to, next, authService) => {
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    return false;
  }

  // Firebase認証 & バックエンド認証が完了している場合
  if (!authService.isAuthenticated) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
    return true;
  }
};
