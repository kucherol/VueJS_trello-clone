<template>
    <v-row class="header">
        <v-col sm="6" class="header__left" >
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btn__additional" v-bind="attrs" v-on="on"><v-icon class="icon__additional">{{ menuDots }}</v-icon></v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="dropdown__text">More from Atlassian</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon small>
                                    <v-icon @click="menu = false">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title class="dropdown__text--title">Switch to</v-list-item-title>
                            <v-list-item-title>
                                <a href="https://start.atlassian.com/" class="dropdown__text--title">Atlassian Start<v-icon class="icon__atlassian-link">{{ linkTo }}</v-icon></a>
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <a href="https://bitbucket.org/dashboard/overview" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <v-icon class="icon__additional icon__bitbucket">{{ bitBucket }}</v-icon>
                                    <p class="btn__text--additional">Bitbucket</p>
                                </v-btn>
                            </a>
                        </v-list-item>
                        <v-list-item>
                            <a href="https://trello.com/" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <v-icon class="icon__additional icon__bitbucket">{{ trelloIcon }}</v-icon>
                                    <p class="btn__text--additional">Trello</p>
                                </v-btn>
                            </a>
                        </v-list-item>
                    </v-list>
                    <v-list>
                        <v-list-item class="list-item__subtitle">
                            <v-list-item-title class="dropdown__text--subtitle">Discover</v-list-item-title>
                        </v-list-item>
                        <v-list-item >
                            <a href="https://www.atlassian.com/software/jira" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <v-icon class="icon__additional icon__bitbucket">{{ jiraIcon }}</v-icon>
                                    <div class="btn__text--optimizer">
                                        <p class="btn__text--additional">Jira Software <span class="text__try">TRY</span></p>
                                        <p class="btn__text--additional btn__text--subtitle">Document collaboration</p>
                                    </div>
                                </v-btn>
                            </a>
                        </v-list-item>
                        <v-list-item>
                            <a href="https://start.atlassian.com/" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <v-icon class="icon__additional icon__bitbucket">{{ compassIcon }}</v-icon>
                                    <p class="btn__text--additional">More Atlassian products</p>
                                </v-btn>
                            </a>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-btn class="btn__additional btn__trello">
                <v-icon class="icon__additional">{{ trelloIcon }}</v-icon>
                <p class="btn__text font-weight-bold text-center">Trello</p>
            </v-btn>
            <v-menu v-model="menuWorkspace" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btn__additional btn__dropdown" v-bind="attrs" v-on="on">Workspaces<v-icon class="icon__menu">{{ downArrow }}</v-icon></v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="dropdown__text">Workspaces</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon small>
                                    <v-icon @click="menuWorkspace = false">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title class="dropdown__text--title">Your workspaces</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <a href="/" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <div class="icon__workspace--container">
                                        <p class="icon__workspace--text">P</p>
                                    </div>
                                    <p class="btn__text--additional">Workspace Trello</p>
                                </v-btn>
                            </a>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class="dropdown__text--title">Guest workspaces</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <a href="/" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <div class="icon__workspace--container icon__workspace--second-container">
                                        <p class="icon__workspace--text">T</p>
                                    </div>
                                    <p class="btn__text--additional">Guest Trello</p>
                                </v-btn>
                            </a>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-menu v-model="menuRecent" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btn__additional btn__dropdown" v-bind="attrs" v-on="on">Recent<v-icon class="icon__menu">{{ downArrow }}</v-icon></v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="dropdown__text">Recent boards</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon small>
                                    <v-icon @click="menuWorkspace = false">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                </v-card>
            </v-menu>
            <v-menu v-model="menuStarred" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btn__additional btn__dropdown" v-bind="attrs" v-on="on">Starred<v-icon class="icon__menu">{{ downArrow }}</v-icon></v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="dropdown__text">Starred boards</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon small>
                                    <v-icon @click="menuStarred = false">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <img src="../../../assets/img/starred-board.svg">
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class="dropdown__text">Star important boards to access them quickly and easily.</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-menu v-model="menuTemplates" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btn__additional btn__dropdown" v-bind="attrs" v-on="on">Templates<v-icon class="icon__menu">{{ downArrow }}</v-icon></v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="dropdown__text">Templates</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon small>
                                    <v-icon @click="menuTemplates = false">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title class="dropdown__text--title">Top templates</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <a href="/" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <div class="icon__template--container">
                                        <img src="../../../assets/img/template_images/template01.jpg" alt="template image" class="icon__template--image">
                                    </div>
                                    <p class="btn__text--additional">1-on-1 Meeting Agenda</p>
                                </v-btn>
                            </a>
                        </v-list-item>
                        <v-list-item>
                            <a href="/" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <div class="icon__template--container">
                                        <img src="../../../assets/img/template_images/template02.jpg" alt="template image" class="icon__template--image">
                                    </div>
                                    <p class="btn__text--additional">Agile Board</p>
                                </v-btn>
                            </a>
                        </v-list-item>
                        <v-list-item>
                            <a href="/" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <div class="icon__template--container">
                                        <img src="../../../assets/img/template_images/template03.jpg" alt="template image" class="icon__template--image">
                                    </div>
                                    <p class="btn__text--additional">Company Overview</p>
                                </v-btn>
                            </a>
                        </v-list-item>
                        <v-list-item>
                            <a href="/" class="btn__bitbucket">
                                <v-btn class="btn__bitbucket">  
                                    <div class="icon__template--container">
                                        <img src="../../../assets/img/template_images/template04.jpg" alt="template image" class="icon__template--image">
                                    </div>
                                    <p class="btn__text--additional">Design Huddle</p>
                                </v-btn>
                            </a>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <div class="templates__footer">
                                <div class="templates__footer-up">
                                    <v-icon class="templates__footer-up--icon">{{ trelloIcon }}</v-icon>
                                    <p class="templates__footer-up--text">See hundreds of templates from the Trello Community</p>
                                </div>
                                <div class="templates__footer-down">
                                    <a href="https://trello.com/templates" class="templates__footer-down--link">
                                        <v-btn class="templates__footer-down--button">Explore templates</v-btn>
                                    </a>
                                </div>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-menu v-model="menuCreate" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btn__additional btn__dropdown btn__create" v-bind="attrs" v-on="on">Create</v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="dropdown__text">Create</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon small>
                                    <v-icon @click="menuCreate = false">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item class="list-item__create">
                            <a href="/" class="create__link">
                                <div class="create__button">
                                    <div class="create__button-top">
                                        <v-icon class="create__button-top--icon">{{ trelloIcon }}</v-icon>
                                        <p class="create__button-top--text">Create board</p>
                                    </div>
                                    <div class="create__button-bottom">
                                        <p class="create__button-bottom--text">A board is made of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
                                    </div>
                                </div>
                            </a>
                        </v-list-item>
                        <v-list-item class="list-item__create">
                            <a href="/" class="create__link">
                                <div class="create__button">
                                    <div class="create__button-top">
                                        <v-icon class="create__button-top--icon">{{ templateIcon }}</v-icon>
                                        <p class="create__button-top--text">Start with a template</p>
                                    </div>
                                    <div class="create__button-bottom">
                                        <p class="create__button-bottom--text">Get started faster with a board template.</p>
                                    </div>
                                </div>
                            </a>
                        </v-list-item>
                        <v-list-item class="list-item__create">
                            <a href="/" class="create__link">
                                <div class="create__button">
                                    <div class="create__button-top">
                                        <v-icon class="create__button-top--icon">{{ peopleIcon }}</v-icon>
                                        <p class="create__button-top--text">Create Workspace</p>
                                    </div>
                                    <div class="create__button-bottom">
                                        <p class="create__button-bottom--text">Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.</p>
                                    </div>
                                </div>
                            </a>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-col>
        <v-col sm="6" class="header__right" >
            <input type="text" class="input__search" placeholder="Search...">
            <v-menu v-model="menuInfo" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btn__additional btn__dropdown" v-bind="attrs" v-on="on"><v-icon class="icon__menu">{{ infoIcon }}</v-icon></v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="dropdown__text">Information</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon small>
                                    <v-icon @click="menuInfo = false">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <img src="../../../assets/img/info_pic.png" alt="information picture" class="info__pic">
                        </v-list-item>
                        <v-list-item class="list-item__info">
                            <v-list-item-title class="dropdown__text info__text">Get inspired by dozens of different Trello workflows.</v-list-item-title>
                            <v-list-item-title class="info__link"><a href="https://trello.com/templates">Get a new tip.</a></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-menu v-model="menuNotification" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btn__additional btn__dropdown" v-bind="attrs" v-on="on"><v-icon class="icon__menu">{{ bellIcon }}</v-icon></v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="dropdown__text">Notification</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon small>
                                    <v-icon @click="menuNotification = false">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item class="list-item__info">
                            <v-list-item-title class="dropdown__text info__text">No notifications yet.</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-menu v-model="menuAva" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btn__additional btn__dropdown" v-bind="attrs" v-on="on"><v-icon class="icon__menu">{{ avaIcon }}</v-icon></v-btn>
                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="dropdown__text">Account</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon small>
                                    <v-icon @click="menuAva = false">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item class="list-item__info">
                            <v-list-item-title class="dropdown__text info__text">Personal cabinet is not ready yet.</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-col>
    </v-row>
</template>

<script>
import { mdiDotsGrid, mdiTrello, mdiMenuDown, mdiLink, mdiBitbucket, mdiJira, mdiCompass, mdiSatellite, mdiAccountGroupOutline, mdiInformationOutline, mdiBellOutline, mdiAccountMultiple } from '@mdi/js';
import 'font-awesome/css/font-awesome.min.css';
export default {
    name: "Header",
    data: () => ({
    menuDots:  mdiDotsGrid,
    trelloIcon: mdiTrello,
    downArrow: mdiMenuDown,
    linkTo: mdiLink,
    bitBucket: mdiBitbucket,
    jiraIcon: mdiJira,
    compassIcon: mdiCompass,
    templateIcon: mdiSatellite,
    peopleIcon: mdiAccountGroupOutline,
    infoIcon: mdiInformationOutline,
    bellIcon: mdiBellOutline,
    avaIcon: mdiAccountMultiple,
    fav: true,
    menu: false,
    menuWorkspace: false,
    menuRecent: false,
    menuStarred: false,
    menuTemplates: false,
    menuCreate: false,
    menuInfo: false,
    menuNotification: false,
    menuAva: false,
    message: false,
    hints: true
}),
};
</script>

<style lang="scss" scoped>
    .header {
        background-color: #026AA7 !important;
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        padding: 6px 4px;
        position: fixed;
        width: 100%;
        align-items: center;
        margin: 0 !important;
        z-index: 999;
        &__left {
            padding: 0 !important;
        }
        &__right {
            padding: 0 !important;
            display: flex;
            justify-content: flex-end;
        }
    }

    .btn {
        &__additional {
            background-color: #026AA7 !important;
            box-shadow: none !important;
            border-radius: 3px;
            text-decoration: none;
            text-transform: none;
            padding: 0 8px !important;
            font-size: 14px !important;
            font-weight: 300 !important;
            color: #fff !important;
            &:hover {
                background-color: rgba($color: #fff, $alpha: 0.3);
            }
        }
        &__text {
            font-family: Noto Sans,sans-serif;
            margin: auto;
            color: #fff;
            &--additional {
                font-size: 12px !important;
                font-weight: 600;
                margin-bottom: 0 !important;
                text-transform: none !important;
                margin-left: 7px;
            }
            &--subtitle {
                display: block !important;
                font-size: 9px !important;
            }
        }
        &__dropdown {
            color: #fff !important;
            padding: 6px 12px;
            align-items: center;
            justify-content: center;
        }
        &__bitbucket {
            width: 95%;
            justify-content: start;
            border: none !important;
            box-shadow: none !important;
            background-color: inherit !important;
        }
        &__create {
            background-color: #054a72 !important;
        }
    }

    .icon {
        &__template {
            &--container {
                margin: 0 !important;
                padding: 0 !important;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &--image {
                width: 35px;
                height: 33px;
                border-radius: 3px;
            }
        }
        &__additional {
            color: #fff !important;
            text-align: center !important;
        }
        &__atlassian-link {
            color: #1976d2 !important;
            margin-left: 4px;
        }
        &__bitbucket {
            color: #026AA7 !important;
        }
        &__workspace {
            &--text {
                color: #fff;
                font-size: 18px;
                margin: 0 !important;
            }
            &--container {
                background: linear-gradient(#403294, #0747a6);
                width: 35px !important;
                height: 35px !important;
                border-radius: 4px;
                margin-bottom: 0 !important;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &--second-container {
                background: linear-gradient(#b22865, #cd5a91);
            }
        }
    }

    .dropdown {
        &__text {
            font-size: 12px !important;
            text-align: center !important;
            &--title {
                font-size: 12px !important;
                font-weight: 600;
            }
            &--subtitle {
                font-size: 0.785714em;
                font-style: inherit;
                line-height: 1.45455;
                font-weight: 700;
            }
        }
    }

    .v {
        &-list {
        padding: 0 !important;
        }
        &-menu--content {
            min-width: 330px !important;
        }
    }

    a.btn__bitbucket {
        text-decoration: none;
    }
    .list-item {
        &__subtitle {
        min-height: 25px !important;
        }
        &__create {
            margin-top: 5px;
            &:hover {
                background-color: rgba(#000, 0.1);
            }
        }
        &__info {
            flex-direction: column;
            min-height: 30px !important;
        }
    }

    .text {
        &__try {
            padding-left: 8px;
            padding-right: 8px;
            background-color: #bcc9db;
            color: #0747A6;
        }
    }

    .templates__footer {
        margin-top: 20px;
        &-up {
            display: flex;
            justify-content: space-between;
            &--text {
                margin-left: 25px;
                max-width: 80%;
                font-size: 14px !important;
            }
            &--icon {
                margin-left: 20px;
                color: #026AA7 !important;
            }
        }
        &-down {
            display: flex;
            justify-content: center;
            &--link {
                text-decoration: none;
            }
            &--button {
                text-transform: none !important;
                font-size: 14px !important;
                margin-bottom: 15px;
                color: #026AA7 !important;
            }
        }
    }

    .create {
        &__link {
            text-decoration: none !important;
            color: black;
        }
        &__button {
            display: flex;
            flex-direction: column !important;
            width: 100%;
            &-top {
                &--icon {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                }
                &--text {
                    display: inline-block;
                    font-size: 14px !important;
                    margin-left: 15px;
                    margin-bottom: 4px !important;
                }
            }
            &-bottom {
                max-width: 240px;
                &--text {
                    font-size: 12px !important;
                    margin-bottom: 4px !important;
                }
            }
        }
    }

    .input {
        &__search {
            border: 1px solid #fff;
            border-radius: 4px;
            background-color: rgba($color: #fff, $alpha: 0.4);
            outline: none !important;
            &:hover {
                background-color: rgba($color: #fff, $alpha: 0.6);
            }
            &::placeholder {
                color: #fff;
            }
        }
    }

    .info {
        &__pic {
            width: 100%;
            height: 150px;
        }
        &__link a {
            display: block !important;
            color: #000;
            font-size: 14px;
            margin-top: 10px;
        }
        &__text {
            display: block !important;
        }
    }

</style>