var REFRESH_INTERVAL_MS = 60000; // 60 seconds

// Let's not alert on the first time the page is loaded and the message count is checked
var hasLoadedForFirstTime = false;
var currentUnreadCount = 0;

$(document).ready(function() {
  // Let's check for new messages every X seconds
  setInterval(function() {
    checkForNewMessages();
  }, REFRESH_INTERVAL_MS);
});

if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}

function checkForNewMessages() {
  if (Notification.permission !== 'granted') {
    return;
  }
  
  var unreadCount = getUnreadMessageCount();
  if (!hasLoadedForFirstTime) {
    hasLoadedForFirstTime = true;
  } else {
    // New message
    if (unreadCount > currentUnreadCount) {
      var notification = new Notification('New Email!', {body: unreadCount + ' unread emails'});
    }
  }
  currentUnreadCount = unreadCount;
}

function getUnreadMessageCount() {
  var unreadCount = 0;
  // TODO: Fix hacky/brittle way of retreiving unread message count
  $('span').each(function() {
    var $span = $(this);
    if ($span.attr('title') == 'Inbox') {
      var innerText = $span.siblings()[3].innerText;
      if (innerText !== '') {
        unreadCount = parseInt(innerText);
      }
      return false; // equivalent to break
    }
  });
  return unreadCount;
}
