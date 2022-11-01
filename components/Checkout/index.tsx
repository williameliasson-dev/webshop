GNU nano 4.8                                                                                                      listeners.ts                                                                                                                 
import { readFileSync, writeFileSync } from "fs";
import axios, { AxiosResponse } from "axios";
import { EmbedBuilder, Guild, Message } from "discord.js";
import config from "./config.json";
import connectDB from "./utils/mongodb";
import { pollModel, PollInterface } from "./pollsystem";

export const youtubeListener: Function = async (guild: Guild): Promise<void> => {
  try{
    const request: Object = {
        method: "GET",
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC_PD6qVk7DVkzE9yU_jTzIw&maxResults=1&order=date&type=video&key=${process.env.youtube}`,

        headers: {
            ["Content-Type"]: "application/json",
        },
    };

    const response: AxiosResponse = await axios(request);
    const videoId: string = response ? response.data.items[0].id.videoId : undefined;

    if (videoId) {
        const latestVideoId: string = readFileSync("src/videoId.txt", {
            encoding: "utf-8",
        });

        if (videoId !== latestVideoId) {
            const channel: any = await guild.channels.fetch(config.channels.upload);
            const url: string = `https://www.youtube.com/watch?v=${videoId}`;

            const message: Message = await channel.send({
                content: `Vi har lagt upp en ny video, checka in den här! ${guild.roles.everyone}\n${url}`,
            });

            const reply: Message = await message.reply({
                content: `Psst! du kan även kolla på videon **reklamfritt** på våran patreon!\nhttps://www.patreon.com/randommakingmovies`,
            });

            reply.suppressEmbeds(true);

            writeFileSync("src/videoId.txt", videoId, {
                encoding: "utf-8",
            });
        }
    }
  }catch(err){
    console.log("Error in youtube listener")
  }
};

export const memberListener = async (guild: Guild): Promise<void> => {
    try {
        const channel: any = await guild.channels.fetch(config.channels.memberCount);
