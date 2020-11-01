
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var states = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"]
var key_states = ["pa", "nc", "fl", "az", "oh", "ga"];

var svg_states = {};

// blue -> #5f6faf
// red -> #fa5f59

var blue_votes = 0;
var red_votes = 0;

function readParams() {

    for(additional of ["dc_tile", "me-1", "me-2", "ne-1", "ne-2", "ne-3"]) {
        states.push(additional);
    }

    console.log(states);

    var states_to_check = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"];

    for(st of states_to_check) {

        svg_states[st] = "0"
    }

    /*
    0 - Gray
    1 - Blue
    2 - Red
    3 - Yellow
    */

    for(st of states) {

        var state = document.getElementById(st + "_path");

        var color_param = urlParams.get(st)


        if(st != "dc_tile" && st != "me-1" && st != "me-2" &&
        st != "ne-1" && st != "ne-2" && st != "ne-3") {
            if(color_param == "1") {
                state.style.fill = "#5f6faf";

                blue_votes += returnElectoralVotesForState(st + "_path")
            }
            else if(color_param == "2") {
                state.style.fill = "#fa5f59";

                red_votes += returnElectoralVotesForState(st + "_path")
            }
            else if(color_param == "3") {
                state.style.fill = "#f0c40f";

            }
            else if(color_param == "0") {
                state.style.fill = "#1e1e1e";
            }
        }
        else {
            // for DC only

            state = document.getElementById(st);

            console.log(state.style);

            if(color_param == "1") {
                state.style.backgroundColor = "#5f6faf";

                blue_votes += returnElectoralVotesForState(st)
            }
            else if(color_param == "2") {
                state.style.backgroundColor = "#fa5f59";

                red_votes += returnElectoralVotesForState(st)
            }
            else if(color_param == "3") {
                state.style.backgroundColor = "#f0c40f";

            }
            else if(color_param == "0") {
                state.style.backgroundColor = "#1e1e1e";
            }

        }




        // if(color_param == "1") {
        //     state.style.fill = "#5f6faf";

        //     blue_votes += returnElectoralVotesForState(st + "_path")
        // }
        // else if(color_param == "2") {
        //     state.style.fill = "#fa5f59";

        //     red_votes += returnElectoralVotesForState(st + "_path")
        // }
        // else if(color_param == "3") {
        //     state.style.fill = "#f0c40f";

        // }
        // else if(color_param == "0") {
        //     state.style.fill = "#1e1e1e";
        // }

        if(st + "_path" == "ma_path") { document.getElementById("ma_tile").style.backgroundColor = state.style.fill; }
        if(st + "_path" == "ri_path") { document.getElementById("ri_tile").style.backgroundColor = state.style.fill; }
        if(st + "_path" == "ct_path") { document.getElementById("ct_tile").style.backgroundColor = state.style.fill; }
        if(st + "_path" == "nj_path") { document.getElementById("nj_tile").style.backgroundColor = state.style.fill; }
        if(st + "_path" == "de_path") { document.getElementById("de_tile").style.backgroundColor = state.style.fill; }
        if(st + "_path" == "md_path") { document.getElementById("md_tile").style.backgroundColor = state.style.fill; }
    
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

    // Polls Closed Parameters

    var closed = urlParams.getAll("c");

    var container = document.getElementById("closed-tile-container");
    
    var i = 0;
    var small_tiles = container.getElementsByClassName("small-tile");

    for(cl of closed) {

        console.log(cl);
        small_tiles[i].removeAttribute("hidden");
        var pid = cl
        if(pid == "dc") { pid += "_tile"; }
        else { pid += "_path"; }
        small_tiles[i].innerHTML = cl.toUpperCase() + "<br>" + returnElectoralVotesForState(pid);

        if (key_states.includes(cl)) { small_tiles[i].style.color = "#f0c40f"; }

        i++;

        document.getElementById(cl + "_closed").checked = true;
    }

    // Poll Closing Parameters

    var closing = urlParams.getAll("s");
    var statesclosing = [];
    var time = "";

    if(closing=="700") { time = "7:00 PM"; statesclosing = ["vt", "ga", "sc", "va", "ky", "in"]; }
    if(closing=="730") { time = "7:30 PM"; statesclosing = ["nc", "wv", "oh"]; }
    if(closing=="800") { time = "8:00 PM"; statesclosing = ["fl", "al", "ms", "tn", "ok", "mo", "il", "md", "de", "pa", "nj", "ct", "ma", "nh", "me", "ri"]; }
    if(closing=="830") { time = "8:30 PM"; statesclosing = ["ar"]; }
    if(closing=="900") { time = "9:00 PM"; statesclosing = ["ny", "mi", "wi", "mn", "nd", "sd", "ne", "wy", "co", "nm", "az", "tx", "ks", "la", "ny"]; }
    if(closing=="1000") { time = "10:00 PM"; statesclosing = ["ia", "mt", "nv", "ut"]; }
    if(closing=="1100") { time = "11:00 PM"; statesclosing = ["ca", "or", "wa", "id", "hi"]; }
    if(closing=="100") { time = "1:00 AM"; statesclosing = ["ak"]; }
    if(closing=="FIN") { time = "Finished"; statesclosing = []; }

    document.getElementById("closingsoontime").innerHTML = time;

    var container = document.getElementById("closing-tile-container");
    
    var i = 0;
    var small_tiles = container.getElementsByClassName("small-tile");

    for(cl of statesclosing) {

        console.log(cl);
        small_tiles[i].removeAttribute("hidden");
        var pid = cl
        if(pid == "dc") { pid += "_tile"; }
        else { pid += "_path"; }
        small_tiles[i].innerHTML = cl.toUpperCase() + "<br>" + returnElectoralVotesForState(pid);

        if (key_states.includes(cl)) { small_tiles[i].style.color = "#f0c40f"; }

        i++;
    }

    // Projection Parameter

    var projs = urlParams.getAll("p");
    var statesclosing = [];


    var container = document.getElementById("projection-tile-container");
    
    var i = 0;
    var small_tiles = container.getElementsByClassName("small-tile");

    for(cl of projs) {

        console.log(cl);
        small_tiles[i].removeAttribute("hidden");
        var pid = cl
        if(pid == "dc") { pid += "_tile"; }
        else { pid += "_path"; }
        small_tiles[i].innerHTML = cl.toUpperCase() + "<br>" + returnElectoralVotesForState(pid);

        if (pid!="dc_tile") {
            small_tiles[i].style.backgroundColor = document.getElementById(pid).style.fill;
        }
        else {
            small_tiles[i].style.backgroundColor = document.getElementById(pid).style.backgroundColor;
        }

        i++;

        document.getElementById(cl + "_proj").checked = true;

    }

    // Chance to Win

    var biden = urlParams.getAll("bi");
    document.getElementById("bidenchance").innerHTML = "BIDEN - " + biden + "%";

    var trump = urlParams.getAll("tr");
    document.getElementById("trumpchance").innerHTML = "TRUMP - " + trump + "%";
}

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
    
    if(urlParams.get("mode") == "admin") {
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

        document.getElementById("admin-panel").removeAttribute("hidden");
    }

    readParams();
    positionElements();

    document.getElementById("adminlink").onclick = generateLinkButton;
})

window.onresize = positionElements;

function positionElements() {

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

    // position dots

    var dot_ids = ["me-1", "me-2", "ne-1", "ne-2", "ne-3"];

    var dot_initx = {"me-1": 778, "me-2": 767, "ne-1": 426, "ne-2": 430, "ne-3": 358}

    for (dot_id of dot_ids) {

        var dot = document.getElementById(dot_id);
        var maincontainer = document.getElementById("main-container");
        
        dot.style.left = String(dot_initx[dot_id] - 60 + maincontainer.getBoundingClientRect().x) + "px";
    }

    // position small panel

    var panel = document.getElementById("small-panel-div");
    var maincontainer = document.getElementById("main-container");

    panel.style.left = String(740 - 60 + maincontainer.getBoundingClientRect().x) + "px";

    // size row 1 panels

    var closed_container = document.getElementById("statesclosed-container");
    var closing_container = document.getElementById("closingsoon-container");

    if(closed_container.getBoundingClientRect().height > closing_container.getBoundingClientRect().height) {
        closing_container.style.height = String(closed_container.getBoundingClientRect().height - 20) + "px";
    }
    else if(closed_container.getBoundingClientRect().height < closing_container.getBoundingClientRect().height) {
        closed_container.style.height = String(closing_container.getBoundingClientRect().height - 20) + "px";
    }



}

function getColorsFromStates() {

    var states_to_check = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"];

    for(st of states_to_check) {

        var state = document.getElementById(st + "_path");


        if(st != "dc_tile" && st != "me-1" && st != "me-2" &&
        st != "ne-1" && st != "ne-2" && st != "ne-3") {
            if(state.style.fill == "rgb(95, 111, 175)") {
                svg_states[st] = "1";
            }
            else if(state.style.fill == "rgb(250, 95, 89)") {
                svg_states[st] = "2";
            }
            else if(state.style.fill == "rgb(240, 196, 15)") {
                svg_states[st] = "3";
            }
            else if(state.style.fill == "rgb(30, 30, 30)") {
                svg_states[st] = "0";
            }
        }
        else {
            // for DC only

            state = document.getElementById(st);

            console.log(state.style);

            if(state.style.backgroundColor == "rgb(95, 111, 175)") {
                svg_states[st] = "1";
            }
            else if(state.style.backgroundColor == "rgb(250, 95, 89)") {
                svg_states[st] = "2";
            }
            else if(state.style.backgroundColor == "rgb(240, 196, 15)") {
                svg_states[st] = "3";
            }
            else if(state.style.backgroundColor == "rgb(30, 30, 30)") {
                svg_states[st] = "0";
            }

        }
    }

}


function generateLinkButton() {

    // colors for states

    getColorsFromStates();

    var states_to_check = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"];

    console.log(svg_states);

    // closed states

    var closed = [];

    for(state of states_to_check) {

        var id = state + "_closed";

        if (document.getElementById(id).checked == true) {
            closed.push(state);
        }
    }

    console.log(closed);
    
    // projected states

    var projected = [];

    for(state of states_to_check) {

        var id = state + "_proj";

        if (document.getElementById(id).checked == true) {
            projected.push(state);
        }
    }

    console.log(projected);

    // next closing

    var nextclosing = document.getElementById("nextclosing").value;

    console.log(nextclosing);

    // biden chance

    var bidenchance = document.getElementById("biden_input").value;
    
    console.log(bidenchance);

    // trump chance

    var trumpchance = document.getElementById("trump_input").value;

    console.log(trumpchance);

    // GENERATE LINK

    var link = "https://ajnn-news.github.io/?mode=viewer&";

    // statecolor
    for(var key in svg_states) {

        link += (key + "=" + svg_states[key] + "&");
    }

    // closed
    console.log(svg_states);
    for(var state of closed) {

        link += ("c=" + state + "&");
    }

    // projected
    for(var state of projected) {

        link += ("p=" + state + "&");
    }

    link += ("s=" + nextclosing + "&");

    link += ("bi=" + bidenchance + "&");

    link += ("tr=" + trumpchance);

    console.log(link);

    document.getElementById("exportlink").innerHTML = link;
}