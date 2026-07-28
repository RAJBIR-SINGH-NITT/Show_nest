import { Injectable } from '@nestjs/common'
import type { Event, NotificationItem, VendorRequest } from '@shownest/types'

@Injectable()
export class VendorService {
  private readonly events: Event[] = [
    {
      id: 'evt-1',
      title: 'Neon Horizon Live',
      slug: 'neon-horizon-live',
      vendorId: 'vendor-1',
      description: 'Launch night concert',
      category: 'Concert',
      venue: 'Jio World Garden',
      date: '2026-08-12',
      status: 'approved',
    },
  ]

  private readonly requests: VendorRequest[] = []

  private readonly notifications: NotificationItem[] = []

  getVendorEvents(vendorId?: string) {
    return this.events.filter((event) => event.vendorId === vendorId)
  }

  createVendorRequest(payload: Partial<VendorRequest> & { vendorId?: string }) {
    const request: VendorRequest = {
      requestId: `req-${Date.now()}`,
      vendorId: payload.vendorId || 'vendor-1',
      eventId: payload.eventId,
      requestType: payload.requestType || 'CREATE_EVENT',
      oldData: payload.oldData,
      newData: payload.newData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    }

    this.requests.push(request)

    this.notifications.push({
      id: `notif-${Date.now()}`,
      vendorId: request.vendorId,
      title: 'Request submitted',
      message: `Your ${request.requestType.toLowerCase()} request has been submitted for review.`,
      read: false,
      createdAt: new Date().toISOString(),
    })

    return request
  }

  updateVendorRequest(payload: Partial<VendorRequest> & { vendorId?: string }) {
    const index = this.requests.findIndex((request) => request.requestId === payload.requestId)
    if (index === -1) {
      return null
    }

    this.requests[index] = {
      ...this.requests[index],
      ...payload,
      status: 'pending',
      submittedAt: this.requests[index].submittedAt,
    } as VendorRequest

    return this.requests[index]
  }

  deleteVendorRequest(requestId: string, vendorId?: string) {
    const request = this.requests.find((item) => item.requestId === requestId && item.vendorId === vendorId)
    if (!request) {
      return null
    }

    this.requests.splice(this.requests.indexOf(request), 1)
    return { deleted: true, requestId }
  }

  getVendorRequests(vendorId?: string) {
    return this.requests.filter((request) => request.vendorId === vendorId)
  }

  getVendorNotifications(vendorId?: string) {
    return this.notifications.filter((notification) => notification.vendorId === vendorId)
  }

  getAllRequests() {
    return this.requests
  }

  approveRequest(requestId: string, approvedBy: string) {
    const request = this.requests.find((item) => item.requestId === requestId)
    if (!request) {
      return null
    }

    request.status = 'approved'
    request.approvedAt = new Date().toISOString()
    request.approvedBy = approvedBy

    if (request.requestType === 'CREATE_EVENT' && request.newData) {
      this.events.push({
        id: request.eventId || `evt-${Date.now()}`,
        title: request.newData.title || 'Untitled Event',
        slug: request.newData.slug || 'untitled-event',
        vendorId: request.vendorId,
        description: request.newData.description,
        category: request.newData.category,
        venue: request.newData.venue,
        date: request.newData.date,
        status: 'approved',
      })
    }

    if (request.requestType === 'UPDATE_EVENT' && request.eventId && request.newData) {
      const index = this.events.findIndex((event) => event.id === request.eventId)
      if (index >= 0) {
        this.events[index] = {
          ...this.events[index],
          ...request.newData,
          id: request.eventId,
          vendorId: request.vendorId,
        }
      }
    }

    if (request.requestType === 'DELETE_EVENT' && request.eventId) {
      this.events.splice(
        this.events.findIndex((event) => event.id === request.eventId),
        1,
      )
    }

    this.notifications.push({
      id: `notif-${Date.now()}`,
      vendorId: request.vendorId,
      title: 'Request approved',
      message: `Your ${request.requestType.toLowerCase()} request was approved.`,
      read: false,
      createdAt: new Date().toISOString(),
    })

    return request
  }

  rejectRequest(requestId: string, rejectionReason: string, approvedBy: string) {
    const request = this.requests.find((item) => item.requestId === requestId)
    if (!request) {
      return null
    }

    request.status = 'rejected'
    request.rejectionReason = rejectionReason
    request.approvedAt = new Date().toISOString()
    request.approvedBy = approvedBy

    this.notifications.push({
      id: `notif-${Date.now()}`,
      vendorId: request.vendorId,
      title: 'Request rejected',
      message: rejectionReason,
      read: false,
      createdAt: new Date().toISOString(),
    })

    return request
  }
}
