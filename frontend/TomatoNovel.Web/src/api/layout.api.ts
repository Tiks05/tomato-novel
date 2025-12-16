import request from '@/utils/request'

// -------------------------------
// types
// -------------------------------
import type { UserProfileUpdateResponse } from '@/types/layout/responses/user-profile-update-response.types'

import type { SearchBookRequest } from '@/types/layout/requests/search-book-request.types'

import type { SearchBookResponse } from '@/types/layout/responses/search-book-response.types'

// =====================================================
// 用户资料 / 作者申请
// =====================================================

/**
 * 作者申请 / 用户资料更新
 * 使用 FormData：
 * - id
 * - name
 * - introduction
 * - avatar（File，可选）
 */
export const applyAsAuthor = (formData: FormData) => {
  return request.post<UserProfileUpdateResponse>('/layout/profile/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// =====================================================
// 搜索图书列表
// =====================================================

/**
 * 搜索图书列表
 */
export const searchBooks = (params: SearchBookRequest) => {
  return request.get<SearchBookResponse>('/layout/search-books', { params })
}
