<script>

    import { enhance } from '$app/forms'
    import { fly } from 'svelte/transition'
    import { m } from '$lib/paraglide/messages.js'

    let textAreaRows = $state(1)
    let textareaValue = $state('')
    let sending = $state(false)
    let success = $state(false)

</script>

<div class="contact">
    <div class="info">
        <span class="header">
            <span class="text">
                {m.contact_header_your_way()}
            </span>
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9998 5.00011L4.99991 4.99997L4.99988 6.99997L11.9998 7.00008L11.9999 17.1719L8.05015 13.2222L6.63594 14.6364L12.9999 21.0004L19.3639 14.6364L17.9496 13.2222L13.9999 17.172L13.9998 5.00011Z"></path></svg>
            </span>
        </span>
        <a class="row" href="mailto:forn@forn.dk">
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path></svg>
            </span>
            <span class="text">
                {m.contact_email()}
            </span>
        </a>
        <div class="row">
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path></svg>
            </span>
            <span class="text">
                {m.contact_phone()}
            </span>
        </div>
        <div class="row">
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM11 8H13V14H11V8ZM8 1H16V3H8V1Z"></path></svg>
            </span>
            <span class="text">
                {m.contact_response_time()}
            </span>
        </div>
    </div>
    
    <form class:sending method="POST" use:enhance={() => {
        sending = true
        return async (res) => {
            setTimeout(() => {
                sending = false
                success = true
            }, 1000)
        }
    }}>
        <span class="header">
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.0002 5.00011L19.0001 4.99997L19.0001 6.99997L12.0002 7.00008L12.0001 17.1719L15.9498 13.2222L17.3641 14.6364L11.0001 21.0004L4.63614 14.6364L6.05035 13.2222L10.0001 17.172L10.0002 5.00011Z"></path></svg>
            </span>
            <span class="text">
                <span class="strikethrough">{m.contact_header_my_way()}</span> {m.contact_header_my_way_alt()}
            </span>
        </span>
        <div class="inputs">
            <div class="form-group">
                <input required type="text" name="name" placeholder={m.contact_placeholder_name()} />
                <input required type="text" name="company" placeholder={m.contact_placeholder_organization()} />
            </div>
            <div class="form-group">
                <input required type="email" name="email" placeholder={m.contact_placeholder_email()} />
                <textarea required bind:value={textareaValue} oninput={() => {
                    if (textareaValue === '') textAreaRows = 1
                    else textAreaRows = 5
                }} name="message" placeholder={m.contact_placeholder_message()} rows={textAreaRows} style="resize: vertical;"></textarea>
            </div>
        </div>
        <button type="submit" class:disabled={sending || success}>
            {#if sending}
                <div class="inner" in:fly={{ duration: 300, y: 15 }} out:fly={{ duration: 300, y: -15 }}>
                    <span class="text">{m.contact_button_sending()}</span>
                    <span class="icon">
                        <svg class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path></svg>
                    </span>
                </div>
            {:else if success}
                <div class="inner success" in:fly={{ duration: 300, y: 15 }} out:fly={{ duration: 300, y: -15 }}>
                    <span class="text">{m.contact_button_success()}</span>
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 13H9C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13H17C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
                    </span>
                </div>
            {:else}
                <div class="inner" in:fly={{ duration: 300, y: 15 }} out:fly={{ duration: 300, y: -15 }}>
                    <span class="text">{m.contact_button_send()}</span>
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"></path></svg>
                    </span>
                </div>
            {/if}
        </button>
    </form>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .contact {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8rem 0;

        .strikethrough {
            text-decoration: line-through;
            opacity: .3;
        }

        .info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            max-width: 500px;
            margin-bottom: 4rem;

            .header {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                align-items: center;
                margin-bottom: 2rem;

                .icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    transform: translateY(5px);
                    flex-shrink: 0;
                }
            }

            .row {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                align-items: center;
                margin-left: $p-inset;

                .icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    color: $accent;
                    margin-top: -3px;
                    flex-shrink: 0;
                }

                .text {
                    font-size: $fs-sm;
                }
            }
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            align-items: flex-end;
            width: 100%;
            max-width: 500px;

            .header {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                align-items: center;
                margin-bottom: 2rem;

                .icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    transform: translateY(5px);
                    flex-shrink: 0;
                }
            }

            .inputs {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                width: 100%;

                .form-group {
                    display: flex;
                    flex-direction: row;
                    gap: 2rem;

                    @media (max-width: $mobile) {
                        flex-direction: column;
                    }

                    input { height: 41px; }

                    input, textarea {
                        padding: .5rem;
                        font-size: $fs-sm;
                        flex-grow: 1;
                        flex-basis: 0;
                        border: none;
                        border-bottom: solid 1px $black;

                        @media (max-width: $mobile) {
                            flex-basis: auto;
                        }
                    }
                }
            }

            button {
                justify-content: flex-end;
                align-items: center;
                margin-top: 2rem;
                border: none;
                font-weight: bold;
                width: 300px;
                display: grid;
                grid-template-rows: 1fr;
                grid-template-columns: 1fr;

                &.disabled {
                    cursor: not-allowed;
                    pointer-events: none;
                    opacity: 1;
                }

                .inner {
                    display: flex;
                    flex-direction: row;
                    gap: 1rem;
                    align-items: center;
                    justify-content: flex-end;
                    grid-column: 1;
                    grid-row: 1;

                    &.success {
                        color: $accent;
                    }

                    .icon {
                        width: $fs-md;
                        height: $fs-md;
                        margin-top: -2px;
                    }
                }
            }
        }
    }

    .spin {
        animation: spin .5s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>