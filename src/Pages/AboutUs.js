import classes from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={classes.design}>
            <div className={classes.contact}>
                <h1>About Us!</h1>
                <label>Kush jemi ne?</label>
                <p>
                    goFind.al është e ardhmja e tregut të punës në Shqipëri dhe jo vetëm. Përmes këtij portali do të jetë më e thjeshtë për të gjithë ju që kërkoni të punësoheni në profesionin tuaj të gjeni vendin e punës ideal. Jeni biznes dhe kërkoni të optimizoni proceset e gjetjes së kandidatit perfekt? Mos kërkoni më tutje. Anëtarësohuni në portalin më të avancuar në tregun Shqiptar dhe bëhuni pjesë e revolucionit!
                </p>

                <label>Misioni ynë</label>
                <p>
                    Qëllimi ynë është të lehtësojmë procesin e ndërmjetësimit mes palëve të interesuara duke i mundësuar ndërveprim nëpërmjet shërbimeve online, të cilat rezultojnë të jetë më të shpejta dhe efektive.
                </p>
                <label>Veprimtaria Jone</label>
                <p>
                    goFind.al është një plaformë që ofron shërbim për dy kategori kryesore: punëkërkues dhe punëdhënës të cilët janë në kërkim të një mënyre më të shpejtë, të thjeshtë e efektive e cila bën të mundur ndërmjetësimin mes palëve në një kohë rekord. Kjo karakteristike është e mundësuar nëpërmjet një mënyre automatike ku të gjitha shërbimet janë të lidhura me njëra tjetrën.
                </p>
                <label>Siguria e të dhënave personale</label>
                <p>
                    Të gjithë profilet e regjistruar në portalin tonë kanë një siguri të plotë mbi ruajtjen e të dhënave të tyre personale. Portali ynë i punësimit menaxhohet nga njerëz shumë të kualifikuar dhe me ekperiencë, që e bën atë të vetmin portal më të sigurtë për sa i përket ruajtjes së të dhënave personale të të gjithë punëkërkuesve.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;