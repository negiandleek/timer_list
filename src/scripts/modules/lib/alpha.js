const alpha = {
    time_split: /[0-9]{0}(?=(?:[0-9]{2})+$)/,
    time_order: ["hours", "minutes", "seconds"],//[, "millis"]
    timer_based: [60 * 60 * 1000, 60 * 1000, 1000],
    time_digits: [2,2,2,4]
}
export default alpha;