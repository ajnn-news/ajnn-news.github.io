
// blue -> #5f6faf
// red -> #fa5f59

var blue_votes = 0;
var red_votes = 0;

var change_color = function() {

    var state = document.getElementById(this.id);

    console.log("onlick");
    console.log(this.id);

    console.log(state.style.fill);

    if(this.id != "dc_tile" && this.id != "me-1" && this.id != "me-2" &&
       this.id != "ne-1" && this.id != "ne-2" && this.id != "ne-3") {
        if(state.style.fill == "rgb(30, 30, 30)") {
            state.style.fill = "#5f6faf";

            blue_votes += returnElectoralVotesForState(this.id)
        }
        else if(state.style.fill == "rgb(95, 111, 175)") {
            state.style.fill = "#fa5f59";

            blue_votes -= returnElectoralVotesForState(this.id)
            red_votes += returnElectoralVotesForState(this.id)
        }
        else if(state.style.fill == "rgb(250, 95, 89)") {
            state.style.fill = "#f0c40f";

            red_votes -= returnElectoralVotesForState(this.id)
        }
        else if(state.style.fill == "rgb(240, 196, 15)") {
            state.style.fill = "#1e1e1e";
        }
    }
    else {
        // for DC only

        console.log(state.style);

        if(state.style.backgroundColor == "rgb(30, 30, 30)") {
            state.style.backgroundColor = "#5f6faf";

            blue_votes += returnElectoralVotesForState(this.id)
        }
        else if(state.style.backgroundColor == "rgb(95, 111, 175)") {
            state.style.backgroundColor = "#fa5f59";

            blue_votes -= returnElectoralVotesForState(this.id)
            red_votes += returnElectoralVotesForState(this.id)
        }
        else if(state.style.backgroundColor == "rgb(250, 95, 89)") {
            state.style.backgroundColor = "#f0c40f";

            red_votes -= returnElectoralVotesForState(this.id)
        }
        else if(state.style.backgroundColor == "rgb(240, 196, 15)") {
            state.style.backgroundColor = "#1e1e1e";
        }

    }

    if(this.id == "ma_path") { document.getElementById("ma_tile").style.backgroundColor = state.style.fill; }
    if(this.id == "ri_path") { document.getElementById("ri_tile").style.backgroundColor = state.style.fill; }
    if(this.id == "ct_path") { document.getElementById("ct_tile").style.backgroundColor = state.style.fill; }
    if(this.id == "nj_path") { document.getElementById("nj_tile").style.backgroundColor = state.style.fill; }
    if(this.id == "de_path") { document.getElementById("de_tile").style.backgroundColor = state.style.fill; }
    if(this.id == "md_path") { document.getElementById("md_tile").style.backgroundColor = state.style.fill; }

    // Change the win tally
    document.getElementById("blue-tally").textContent = String(blue_votes) + " votes";
    document.getElementById("red-tally").textContent = String(red_votes) + " votes";

    // Change the win bars
    var width = document.getElementById("winbar-container").getBoundingClientRect().width;
    var num_electors = 538;

    console.log(width);

    document.getElementById("blue-bar").style.width = String(blue_votes / num_electors * width) + "px";
    document.getElementById("red-bar").style.width = String(red_votes /  num_electors * width) + "px";

}

function returnElectoralVotesForState(state_id) {

    if(state_id == "al_path") { return 9 }
    if(state_id == "ak_path") { return 3 }
    if(state_id == "az_path") { return 11 }
    if(state_id == "ar_path") { return 6 }
    if(state_id == "ca_path") { return 55 }
    if(state_id == "co_path") { return 9 }
    if(state_id == "ct_path") { return 7 }
    if(state_id == "de_path") { return 3 }
    if(state_id == "fl_path") { return 29 }
    if(state_id == "ga_path") { return 16 }
    if(state_id == "hi_path") { return 4 }
    if(state_id == "id_path") { return 4 }
    if(state_id == "il_path") { return 20 }
    if(state_id == "in_path") { return 11 }
    if(state_id == "ia_path") { return 6 }
    if(state_id == "ks_path") { return 6 }
    if(state_id == "ky_path") { return 8 }
    if(state_id == "la_path") { return 8 }
    if(state_id == "me_path") { return 2 }
    if(state_id == "md_path") { return 10 }
    if(state_id == "ma_path") { return 11 }
    if(state_id == "mi_path") { return 16 }
    if(state_id == "mn_path") { return 10 }
    if(state_id == "ms_path") { return 6 }
    if(state_id == "mo_path") { return 10 }
    if(state_id == "mt_path") { return 3 }
    if(state_id == "ne_path") { return 2 }
    if(state_id == "nv_path") { return 6 }
    if(state_id == "nh_path") { return 4 }
    if(state_id == "nj_path") { return 14 }
    if(state_id == "nm_path") { return 5 }
    if(state_id == "ny_path") { return 29 }
    if(state_id == "nc_path") { return 15 }
    if(state_id == "nd_path") { return 3 }
    if(state_id == "oh_path") { return 18 }
    if(state_id == "ok_path") { return 7 }
    if(state_id == "or_path") { return 7 }
    if(state_id == "pa_path") { return 20 }
    if(state_id == "ri_path") { return 4 }
    if(state_id == "sc_path") { return 9 }
    if(state_id == "sd_path") { return 3 }
    if(state_id == "tn_path") { return 11 }
    if(state_id == "tx_path") { return 38 }
    if(state_id == "ut_path") { return 6 }
    if(state_id == "vt_path") { return 3 }
    if(state_id == "va_path") { return 13 }
    if(state_id == "wa_path") { return 12 }
    if(state_id == "wv_path") { return 5 }
    if(state_id == "wi_path") { return 10 }
    if(state_id == "wy_path") { return 3 }
    if(state_id == "dc_tile") { return 3 }
    if(state_id == "me-1") { return 1 }
    if(state_id == "me-2") { return 1 }
    if(state_id == "ne-1") { return 1 }
    if(state_id == "ne-2") { return 1 }
    if(state_id == "ne-3") { return 1 }
}

window.addEventListener('load', function () {
    
    var states = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"]

    for(state of states) {
        var id = state + "_path"

        document.getElementById(id).onclick = change_color
    }

    document.getElementById("dc_tile").onclick = change_color
    document.getElementById("me-1").onclick = change_color
    document.getElementById("me-2").onclick = change_color
    document.getElementById("ne-1").onclick = change_color
    document.getElementById("ne-2").onclick = change_color
    document.getElementById("ne-3").onclick = change_color

    // position centerline
    var bar = document.getElementById("winbar-container");

    var centerX = bar.getBoundingClientRect().x;
    var centerWidth = bar.getBoundingClientRect().width;
    var centerY = bar.getBoundingClientRect().y;
    var centerHeight = bar.getBoundingClientRect().height;
    var centerline = document.getElementById("centerline");
    var centerbartext = document.getElementById("centertext");

    centerline.style.left = String(centerX + (centerWidth / 2)) + "px";
    centerline.style.top = String(centerY - (20 - (centerHeight / 2))) + "px";

    centerbartext.style.left = String(centerX + 2) + "px";
    centerbartext.style.width = String(centerWidth) + "px";
    centerbartext.style.top = String(centerY + centerHeight - 4) + "px";

})


