import request from '@/utils/request'

// ===== request types =====
import type { GetChapterDetailRequest } from '@/types/workspace/requests/get-chapter-detail-request.types'
import type { UpdateVolumeRequest } from '@/types/workspace/requests/update-volume-request.types'
import type { CreateVolumeRequest } from '@/types/workspace/requests/create-volume-request.types'
import type { ChapterCreateRequest } from '@/types/workspace/requests/chapter-create-request.types'
import type { ChapterListRequest } from '@/types/workspace/requests/chapter-list-request.types'
import type { ChapterUpdateRequest } from '@/types/workspace/requests/chapter-update-request.types'
import type { MyBookListRequest } from '@/types/workspace/requests/my-book-list-request.types'

// ===== response types =====
import type { AuthorApplyResponse } from '@/types/workspace/responses/author-apply-response.types'
import type { WriterStatsResponse } from '@/types/workspace/responses/writer-stats-response.types'
import type { NoticeListResponse } from '@/types/workspace/responses/notice-list-response.types'
import type { NewsListResponse } from '@/types/workspace/responses/news-list-response.types'
import type { BookRankResponse } from '@/types/workspace/responses/book-rank-response.types'
import type { MyBookListResponse } from '@/types/workspace/responses/my-book-list-response.types'
import type { BookDetailResponse } from '@/types/workspace/responses/book-detail-response.types'
import type { LastChapterInfoResponse } from '@/types/workspace/responses/last-chapter-info-response.types'
import type { ChapterListResponse } from '@/types/workspace/responses/chapter-list-response.types'
import type { ChapterDetailResponse } from '@/types/workspace/responses/chapter-detail-response.types'
import type { LastChapterResponse } from '@/types/workspace/responses/last-chapter-response.types'
import type { LatestChapterResponse } from '@/types/workspace/responses/latest-chapter-response.types'

// ============================
// 作家 / 作者
// ============================

// 申请作家（multipart/form-data）
export const applyAsAuthor = (formData: FormData) =>
  request.post<AuthorApplyResponse>('/workspace/apply', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

// 作家统计
export const getUserStats = (userId: number) => request.get<WriterStatsResponse>(`/workspace/writer/stats/${userId}`)

// ============================
// 公告 / 活动
// ============================

// 公告列表
export const getActiveList = (limit = 3) =>
  request.get<NoticeListResponse>('/workspace/writer/notice-list', {
    params: { limit },
  })

// 活动列表
export const getNewsList = (limit = 4) =>
  request.get<NewsListResponse>('/workspace/writer/news-list', {
    params: { limit },
  })

// ============================
// 榜单
// ============================

export const getBookRank = (type: string, category: string) =>
  request.get<BookRankResponse>('/workspace/writer/book-rank', {
    params: { type, category },
  })

// ============================
// 书籍
// ============================

// 创建书籍（multipart/form-data）
export const createBookInfo = (formData: FormData) =>
  request.post<void>('/workspace/writer/create-book', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

// 我的书籍列表
export const getMyBookList = (params: MyBookListRequest) =>
  request.get<MyBookListResponse>('/workspace/writer/my-book-list', { params })

// 书籍详情
export const getBookDetail = (bookId: number) =>
  request.get<BookDetailResponse>(`/workspace/writer/book-overview/${bookId}`)

// 删除书籍
export const deleteBookById = (id: number) => request.delete<void>(`/workspace/writer/delete-book/${id}`)

// 更新书籍
export const updateBookInfo = (formData: FormData) =>
  request.post<void>('/workspace/writer/update-book', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

// ============================
// 章节
// ============================

// 最近章节信息（创建章节前使用）
export const getLastChapterInfoByBookId = (bookId: number) =>
  request.get<LastChapterInfoResponse>('/workspace/writer/get-last-chapterInfo', {
    params: { book_id: bookId },
  })

// 创建章节
export const createChapter = (data: ChapterCreateRequest) =>
  request.post<void>('/workspace/writer/create-chapter', data)

// 章节列表
export const getChapterListByBookId = (params: ChapterListRequest) =>
  request.get<ChapterListResponse>('/workspace/writer/chapter-list', { params })

// 删除章节
export const deleteChapterById = (chapterId: number) =>
  request.delete<void>(`/workspace/writer/delete-chapter/${chapterId}`)

// 章节详情
export const getChapterDetailById = (params: GetChapterDetailRequest) => {
  return request.get<ChapterDetailResponse>('/workspace/writer/chapter-detail', { params })
}

// 更新章节
export const updateChapter = (data: ChapterUpdateRequest) =>
  request.post<void>('/workspace/writer/update-chapter', data)

// ============================
// 分卷
// ============================

// 删除分卷
export const deleteVolumeById = (bookId: number, volumeId: number) =>
  request.delete<void>('/workspace/writer/delete-volume', {
    params: { book_id: bookId, volume_id: volumeId },
  })

// 更新分卷
export const updateVolume = (data: UpdateVolumeRequest) => {
  return request.post<void>('/workspace/writer/update-volume', data)
}

// 创建分卷
export const createVolume = (data: CreateVolumeRequest) => {
  return request.post<void>('/workspace/writer/create-volume', data)
}

// ============================
// 最后 / 最新章节
// ============================

// 指定分卷下最后一章
export const getLastChapterByVolumeId = (bookId: number, volumeId: number) =>
  request.get<LastChapterResponse>('/workspace/writer/last-chapter-by-volume', {
    params: {
      book_id: bookId,
      volume_id: volumeId,
    },
  })

// 整本书最后一章
export const getLastChapterByBookId = (bookId: number) =>
  request.get<LastChapterResponse>('/workspace/writer/last-chapter', {
    params: { book_id: bookId },
  })

// 最新章节
export const getLatestChapterByBookId = (bookId: number) =>
  request.get<LatestChapterResponse>('/workspace/writer/latest-chapter', {
    params: { book_id: bookId },
  })
