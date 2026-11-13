// Booking for "Book a call" buttons (see BookCallButton).
//
// CAL_LINK is the Cal.com event to book, written as "<username>/<event-slug>",
// e.g. "sokmesa/discovery-call" for https://cal.com/sokmesa/discovery-call.
// Spam protection, booking questions and limits are configured on that event
// in Cal.com, not here: the site is static, so the checks have to run on
// Cal.com's servers.
//
// While CAL_LINK is empty the buttons fall back to email.
export const CAL_LINK = "";

export const CONTACT_EMAIL = "ksokmesa@gmail.com";

export const calBookingUrl = (link: string) => `https://cal.com/${link}`;
