import OneSignal from "react-onesignal"

// OneSignal configuration
const ONESIGNAL_APP_ID = import.meta.env.VITE_ONESIGNAL_APP_ID || "YOUR_ONESIGNAL_APP_ID"

// Type for OneSignal notifications
export interface OneSignalNotification {
  id: string
  heading: string
  content: string
  url?: string
  icon?: string
  data?: Record<string, unknown>
}

/**
 * Initialize OneSignal
 * Call this function once when your app starts
 */
export async function initializeOneSignal() {
  try {
    // Initialize using the window.OneSignal object directly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).OneSignal) {
      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: true // Enable for local development
      })
    }

    console.log("OneSignal initialized successfully")

    // Wait for OneSignal to be fully ready

    await new Promise<void>((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).OneSignal) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).OneSignal.push(() => {
          console.log("OneSignal is ready")
          resolve()
        })
      } else {
        resolve()
      }
    })
  } catch (error) {
    console.error("Error initializing OneSignal:", error)
  }
}

/**
 * Show native permission prompt
 */
export async function showNotificationPrompt() {
  try {
    // This will trigger the browser's native notification permission dialog
    const permission = await Notification.requestPermission()
    console.log("Notification permission result:", permission)
    return permission === "granted"
  } catch (error) {
    console.error("Error showing notification prompt:", error)
    return false
  }
}

/**
 * Set external user ID (for linking to your user system)
 * This requires accessing the OneSignal global object after initialization
 */
export async function setUserExternalId(userId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).OneSignal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window as any).OneSignal.setExternalUserId(userId)
      console.log("OneSignal external user ID set:", userId)
    }
  } catch (error) {
    console.error("Error setting external user ID:", error)
  }
}

/**
 * Set user tags (for segmentation)
 */
export async function setUserTags(tags: Record<string, string>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).OneSignal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window as any).OneSignal.sendTags(tags)
      console.log("OneSignal tags set:", tags)
    }
  } catch (error) {
    console.error("Error setting tags:", error)
  }
}

/**
 * Remove user tags
 */
export async function removeUserTags(tagKeys: string[]) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).OneSignal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window as any).OneSignal.deleteTags(tagKeys)
      console.log("OneSignal tags removed:", tagKeys)
    }
  } catch (error) {
    console.error("Error removing tags:", error)
  }
}

/**
 * Get the user's OneSignal player ID
 */
export async function getPlayerId(): Promise<string | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).OneSignal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const playerId = await (window as any).OneSignal.getUserId()
      return playerId
    }
    return null
  } catch (error) {
    console.error("Error getting player ID:", error)
    return null
  }
}

/**
 * Check if user is subscribed to push notifications
 */
export async function isSubscribed(): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).OneSignal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isPushEnabled = await (window as any).OneSignal.isPushNotificationsEnabled()
      return isPushEnabled
    }
    return false
  } catch (error) {
    console.error("Error checking subscription status:", error)
    return false
  }
}

/**
 * Manually opt the user in to push notifications
 */
export async function optInToPush() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).OneSignal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window as any).OneSignal.setSubscription(true)
      console.log("User opted in to push notifications")
    }
  } catch (error) {
    console.error("Error opting in to push:", error)
  }
}

/**
 * Manually opt the user out of push notifications
 */
export async function optOutOfPush() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).OneSignal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window as any).OneSignal.setSubscription(false)
      console.log("User opted out of push notifications")
    }
  } catch (error) {
    console.error("Error opting out of push:", error)
  }
}

/**
 * Listen for notifications
 * Wait for OneSignal to be ready before adding listeners
 */
export function onNotificationReceived(callback: (notification: OneSignalNotification) => void) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).OneSignal) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).OneSignal.push(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).OneSignal.on("notificationDisplay", callback)
    })
  }
}

/**
 * Listen for notification clicks
 * Wait for OneSignal to be ready before adding listeners
 */
export function onNotificationClicked(callback: (notification: OneSignalNotification) => void) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).OneSignal) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).OneSignal.push(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).OneSignal.on("notificationClicked", callback)
    })
  }
}
