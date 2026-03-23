function precise(x) {
  return x.toPrecision(4);
}

function power_from_wavelength(lmb) {
    if ((lmb < 630) || (lmb > 16000)) {
        return 0
    }
    const wavelengths = [630,640,660,680,700,720,740,760,780,800,820,840,860,880,900,920,940,960,980,1000,1036,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000,2020,2089,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3100,3200,3300,3400,3500,3600,3700,3800,3900,4000,4100,4500,5000,5500,6000,6500,7000,7500,8000,8500,9000,9500,10000,10500,11000,11500,12000,12500,13000,13500,14000,14500,15000,15500,16000];
    const powers = [1128,1357,2010,2351,2520,2740,2660,2740,2650,2598,2610,2558,2474,2523,2480,2380,2360,2120,2201,1840,969.5,1520,1430,1400,1390,1270,1170,3124,5611,6704,8270,8352,7972,7640,6950,6787,5930,5060,5004,5086,4500,4160,4210,4218,4234,4040,4210,4279,3440,3216,3060,3360,3380,3361,3290,3210,3070,2655,2490,2246,1830,1510,1248,950,743,621.6,713,452.5,362.4,362,357.9,340.6,314,291,267.6,246.5,237,229.6,219,206,186.0,168,147,135.1,124.8,116.4,107.8,101.1];

    let i = 0;

    for (i = 0; i < wavelengths.length - 1; i++) {
        if (lmb < wavelengths[i+1]) {
            break;
        }
    }
    const r = (lmb-wavelengths[i])/(wavelengths[i+1]-wavelengths[i]);
    return (powers[i] + (powers[i+1]-powers[i]) * r)
}

function populate() {

    const f_ev = document.getElementById('ev_form');
    const f_nm = document.getElementById('nm_form');
    const f_thz = document.getElementById('thz_form');
    f_ev.addEventListener('input', ev_changed);
    f_nm.addEventListener('input', nm_changed);
    f_thz.addEventListener('input', thz_changed);
    f_ev.addEventListener('submit', suppress_submit);
    f_nm.addEventListener('submit', suppress_submit);
    f_thz.addEventListener('submit', suppress_submit);
    
    const f_mw = document.getElementById('mw_form');
    const f_khz = document.getElementById('khz_form');
    const f_uj = document.getElementById('uj_form');
    f_mw.addEventListener('input', mw_changed);
    f_uj.addEventListener('input', uj_changed);
    f_khz.addEventListener('input', khz_changed);
    f_mw.addEventListener('submit', suppress_submit);
    f_uj.addEventListener('submit', suppress_submit);
    f_khz.addEventListener('submit', suppress_submit);
    
    const f_d_init = document.getElementById('d_init_form');
    const f_d_lens = document.getElementById('d_lens_form');
    const f_m2 = document.getElementById('m2_form');
    const f_fwhm = document.getElementById('fwhm_form');
    f_d_init.addEventListener('input', calc_focus);
    f_d_lens.addEventListener('input', calc_focus);
    f_m2.addEventListener('input', calc_focus);
    f_fwhm.addEventListener('input', calc_focus);
    f_d_init.addEventListener('submit', calc_focus);
    f_d_lens.addEventListener('submit', calc_focus);
    f_m2.addEventListener('submit', calc_focus);
    f_fwhm.addEventListener('submit', calc_focus);
}

function suppress_submit(event) {
    event.preventDefault();
}

function ev_changed(event) {
    event.preventDefault();
    const q_thz = document.getElementById('thz_query');
    const q_nm = document.getElementById('nm_query');
    const q_ev = document.getElementById('ev_query');
    const ev = parseFloat(q_ev.value);
    q_nm.value = precise(1239.84198 / ev);
    q_thz.value = precise(241.798924 * ev);
    calc_focus();
}

function nm_changed(event) {
    event.preventDefault();
    const q_thz = document.getElementById('thz_query');
    const q_nm = document.getElementById('nm_query');
    const q_ev = document.getElementById('ev_query');
    const nm = parseFloat(q_nm.value);
    q_ev.value = precise(1239.84198 / nm);
    q_thz.value = precise(299792.458 / nm);
    calc_focus();
}

function thz_changed(event) {
    event.preventDefault();
    const q_thz = document.getElementById('thz_query');
    const q_nm = document.getElementById('nm_query');
    const q_ev = document.getElementById('ev_query');
    const thz = parseFloat(q_thz.value);
    q_ev.value = precise(thz / 241.798924);
    q_nm.value = precise(299792.458 / thz);
    calc_focus();
}

function mw_changed(event) {
    event.preventDefault();
    const q_mw = document.getElementById('mw_query');
    const q_khz = document.getElementById('khz_query');
    const q_uj = document.getElementById('uj_query');
    const mw = parseFloat(q_mw.value);
    const khz = parseFloat(q_khz.value);
    if ((khz != 0) && (mw != 0)) {
        q_uj.value = precise(mw/khz);
    }
    calc_focus();
}

function khz_changed(event) {
   event.preventDefault()
}

function uj_changed(event) {
    event.preventDefault();
    const q_mw = document.getElementById('mw_query');
    const q_khz = document.getElementById('khz_query');
    const q_uj = document.getElementById('uj_query');
    const khz = parseFloat(q_khz.value);
    const uj = parseFloat(q_uj.value);
    if ((khz != 0) && (uj != 0)) {
        q_mw.value = precise(khz*uj);
    }
    calc_focus();
}


function suppress_submit(event) {
    event.preventDefault();
}

function calc_focus_wrapper(event) {
    event.preventDefault();
    calc_focus();
}

function calc_focus() {

    const q_nm = document.getElementById('nm_query');
    const q_uj = document.getElementById('uj_query');
    const q_d_init = document.getElementById('d_init_query');
    const q_d_lens = document.getElementById('d_lens_query');
    const q_m2 = document.getElementById('m2_query');
    const q_fwhm = document.getElementById('fwhm_query');
    const result_diameter = document.getElementById('focus_diameter');
    const result_fluence = document.getElementById('peak_fluence');
    const result_field = document.getElementById('peak_field');
    
    const d_init = q_d_init.value;
    const d_lens = q_d_lens.value;
    const m2 = q_m2.value;
    const fwhm = q_fwhm.value;
    const nm = q_nm.value;
    const uj = q_uj.value;

    const d_final = 4e-3 * m2 * nm * d_lens / (3.14159 * d_init);
    const fluence = 8e8 * uj / (3.14159 * (d_final*d_final));
    const intensity = 0.94 * fluence / fwhm;
    const peak_field = 0.0868 * Math.sqrt(intensity);

    if (!isNaN(d_final)&&(d_final > 0)) {
        result_diameter.innerHTML = precise(d_final).toString() + " µm";
        if (!isNaN(fluence)&&(fluence > 0)) {
            result_fluence.innerHTML = precise(fluence).toString() + " µJ/cm^2";
            if (!isNaN(peak_field)&&(peak_field > 0)) {
                result_field.innerHTML = precise(peak_field).toString() + " V/nm";
            }
        }
    }
    
}






function auto_power_from_wavelength() {
    // event.preventDefault();
    const q_nm = document.getElementById('nm_query');
    const q_mw = document.getElementById('mw_query');
    const q_khz = document.getElementById('khz_query');
    const q_uj = document.getElementById('uj_query');
    const mw = power_from_wavelength(q_nm.value);
    if (mw != 0) {
        q_khz.value = 500;
        q_mw.value = precise(mw);
        q_uj.value = precise(mw/500);
    }
    calc_focus();
}