/**
 * @author: Ronan
 * @npc: Guon
 * @map: 251010404 - Over the Pirate Ship
 * @func: Pirate PQ
*/

var status = 0;
var em = null;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                
                if (status == 0) {
                        em = cm.getEventManager("PiratePQ");
                        if(em == null) {
                                cm.sendOk("The Pirate PQ has encountered an error.");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendSimple("#b<Party Quest: Pirate Ship>\r\n#k" + em.getProperty("party") + "\r\n\r\nHelp! My son has been kidnapped and is bound on the hands of the fearful #rLord Pirate#k. I need your help... Would you please assemble or join a team to save him? Have your #bparty leader#k talk to me or make yourself a party.#b\r\n#L0#I want to participate in the party quest.\r\n#L1#I want to find party members.\r\n#L2#I would like to hear more details.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("You can participate in the party quest only if you are in a party.");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("Your party leader must talk to me to start this party quest.");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(0, cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("Another party has already entered the #rParty Quest#k in this channel. Please try another channel, or wait for the current party to finish.");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("You cannot start this party quest yet, because either your party is not in the range size, some of your party members are not eligible to attempt it or they are not in this map. If you're having trouble finding party members, try Party Search.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                cm.sendOk("Try using a Super Megaphone or asking your buddies or guild to join!");
                                cm.dispose();
                        } else {
                                cm.sendOk("#b<Party Quest: Pirate Ship>#k\r\nIn this PQ, your mission is to progressively make your way through the ship, taking on all pirates and baddies in your path. Reaching the #rLord Pirate#k, depending on how many great chests you opened on the stages before, the boss will reveal himself even more powerful, so stay alert. Said chests, if opened, gives many extra rewards to your crew, it's worth a shot! Good luck.");
                                cm.dispose();
                        }
                }
        }
}