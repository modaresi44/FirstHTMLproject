function formatConsultant() {
    if( typeof(CABI_STYLIST_INFO) === "undefined" ) return;
    $(".consultant-application a").attr("href", $(".consultant-application a").attr('href') + window.CABI_STYLIST_INFO.PartyId);
    $("#consultant-purchase-link a, #consultant-purchase-link, .consultant-purchase-link").attr("href", $("#consultant-purchase-link a").attr("href") +  window.CABI_STYLIST_INFO.PartyId);
    $(document).trigger("consultantInfo");
}
window.onload = formatConsultant;
