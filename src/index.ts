/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
const deskNames: string[] = ['Nebulae', 'Pulsar', 'Constellation', 'Lionel', 'Chief_Architect']

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    // console.log('Player tags: ',WA.player.tags)
    
    for (const name of deskNames) {
        WA.room.onEnterLayer(name + 'OfficeTrigger').subscribe(() => {
            currentPopup = WA.ui.openPopup(name+'Title', `Welcome to ${name}'s office`, [])
        })
        WA.room.onLeaveLayer(name + 'OfficeTrigger').subscribe(closePopUp)
    }

    WA.room.onEnterLayer('WarRoomOfficeTrigger').subscribe(() => {
        currentPopup = WA.ui.openPopup('WarRoomTitle', 'War Room', [])
    })
    WA.room.onLeaveLayer('WarRoomOfficeTrigger').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
    
}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
