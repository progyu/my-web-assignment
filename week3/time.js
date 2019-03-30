// 리얼타임을 화면에 표시---------------------------------------------------------------------
function updateClock() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();

    // 시계 표기 방법에 대한 여러 환경설정------------------------------------------------------  

    // Pad the minutes and seconds with leading zeros, if required
    currentHours = (currentHours < 10 ? "0" : "") + currentHours;
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

    // Choose either "AM" or "PM" as appropriate
    var timeOfDay = (currentHours < 12) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

    // Convert an hours component of "0" to "12"
    currentHours = (currentHours == 0) ? 12 : currentHours;

    // 실제 화면에 표시하는 변수
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
    var ampmTime = timeOfDay;

    // html에 매핑 
    $(".clock").html(
        '<span class="tictok">' + currentTimeString + '</span>' + '<span class="ampm">' +
        ampmTime + '</span>'
    );
}
// 1초마다 시간을 화면에 표기 ----------------------------------------------------------------
$(document).ready(function () {
    setInterval('updateClock()', 1000);
});