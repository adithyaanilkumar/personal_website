---
title: Arch Linux Nightmare
description: Installing Arch Linux with KDE Plasma or GNOME Desktop ( Dual Booting with Windows)
date: '2020-03-16'
draft: false
slug: '/blog/arch'
tags:
  - Arch
  - KDE
  - Linux
---

# Installing Arch Linux with KDE Plasma or GNOME Desktop ( Dual Booting with Windows)

Hi Guys! Most of us today maybe using Windows as our daily driver. For most daily tasks, windows is more than enough. But the question you need to be asking is , is windows really necessary? I agree that window is pretty powerful, but most of us do not realize how heavy it is on the system.

Is your computer getting slow running windows? Do you have an old or low end PC which lags while running windows? Do you wish to switch to something light, something which will run smoothly on most hardware configurations? Then you are in the right place.

Today we will be seeing how you can dual boot **Arch Linux **with** Windows.**

![Arch Linux is light but powerful](https://cdn-images-1.medium.com/max/2000/1*JPGVwNVRSjYlWMB0ExACBg.jpeg)_Arch Linux is light but powerful_

**Arch Linux** is ranked as one of the best and lightest Linux distros. It is highly customizable and can be configured according to the user's needs.Unlike other popular distros like **Ubuntu** which is based on **Debian**, **Arch Linux** was built from scratch independent of any other Linux distribution.**Arch Linux** is a rolling release which means that it eradicates the system update frenzy that users of other distro types go through. Because it's a rolling release, its core system is always up to date with the latest fixes and new features and you wouldn't have to worry about when to install what and how long system updates will take.

So without further ado, Lets get started!

## Prerequisites

- A bootable USB of at least 8Gb size.

- UEFI BIOS mode on your PC

- Basic understanding of Linux Bash
  > I recommend everyone to use the [Arch wiki](https://wiki.archlinux.org/) as it will teach you the fundamentals of how to install and manage an operating system .Use this guide as a reference if you cannot understand the steps provided in the [Arch wiki](https://wiki.archlinux.org/).

## Step 0: Creating the Boot-able USB

- Download the [Arch Linux ISO](https://www.archlinux.org/download/).

- Download [Rufus](https://rufus.ie/).

- Insert pen drive into the PC and open Rufus

- Open the Arch Linux ISO in Rufus

![It should look something similar to this](https://cdn-images-1.medium.com/max/2000/1*chBQNN28yOOAMyx3JC7F1g.jpeg)_It should look something similar to this_

- Click on start and wait for the process to finish.

## Step 1: Partitioning Windows.

- Go to windows disk management tool and select the disk you want to install Arch Linux on.

- Right-click and tap on shrink volume, allocate the necessary size required for the arch Linux partition(Min 10 Gb).

![](https://cdn-images-1.medium.com/max/2000/1*v-DpkCs7b0BKtHEeVpXXUA.jpeg)

## Step 2: Live boot into the installation media

- Reboot your system and go into the boot manager. For HP devices its Esc .

- Boot into the USB device.

- After booting into the installation media, make sure you are connected to the internet. This is essential for the next steps.

- To connect to WiFi, type the command wifi-menu and connect to the respective WiFi network. Test the connection by pinging the google server with ping google.com . You should see the ping.

![Ping should show up like this](https://cdn-images-1.medium.com/max/2000/1*lFS__6PMZ_VYQQsrSryqVA.png)_Ping should show up like this_

## Step 3: Create Linux Partitions

- Set the clock on the system

  timedatectl set-ntp true

- Type the following commands to create **three** partitions required for the **Arch Linux** installation.

  fdisk -l

This will list all the disks on your device and its partions.

Select the disk by:

    fdisk /dev/<disk_name>

Here, **<disk_name>** should be replaced by the name of your disk where you wish to install **Arch Linux** on and the disk you had created an unallocated space in the windows disk management tool.

In my case, It is:

    fdisk /dev/sda

![it'll be **/dev/nvme0n1** if it is an **SSD** and If it is a **HDD**, itll be **/dev/sda**](https://cdn-images-1.medium.com/max/2000/1*oCKGugrWVMDB4uzI9ttAow.jpeg)\*it'll be **/dev/nvme0n1** if it is an **SSD** and If it is a **HDD**, itll be **/dev/sda\***

Follow the following commands:

(The lines after **//** are comments for you to understand. Don't type them in bash)

    command (m for help): n //press n here
    Partition Number (5-128, default 5):5
    First Sector: //press enter
    Last Sector: +512M //press enter after entering the size.

Now to change the filesystem to a **EFI** filesystem, press t.

    command (m for help): t//press t here
    Partition Number: 5
    Partition Type: 1 //press one and press enter

Now to create the partition where you will be storing all of your data,

    command (m for help): n //press n here
    Partition Number (6-128, default 6):6
    First Sector: //press enter
    Last Sector: +8G //press enter after entering the size.

Now to create the third and final partition for the **SWAP** file,

    command (m for help): n //press n here
    Partition Number (7-128, default 7):7
    First Sector: //press enter
    Last Sector: //press enter , the size will be filled automatically

Now to change the filesystem to a **SWAP** filesystem, press t.

    command (m for help): t//press there
    Partition Number: 7
    Partition Type: 19//type 19 and press enter

Make sure the partitions are correct, by typing p,

![The partitions should look like this](https://cdn-images-1.medium.com/max/2000/1*coj7eBV7mU5ROgWmoSgXpg.jpeg)_The partitions should look like this_

If they are correct, write the changes by pressing w and enter .

- **Lets wipe the EFI partition to FAT32 format**

![**EFI** partition(device) is** /dev/sda5 **in my case. It may vary in your case.](https://cdn-images-1.medium.com/max/2000/1*d_9Z37b5D-s8G61hl0Tf_w.png)**\*EFI** partition(device) is** /dev/sda5 **in my case. It may vary in your case.\*

    mkfs.fat -F32 /dev/<EFI Partition device>

(replace **<EFI Partition device>** with the **EFI** partition device ,ie **/dev/sda5 **in my case.)

So in my case it'll be:

    mkfs.fat -F32 /dev/sda5

- **Lets make the SWAP volume now.**

![**SWAP** partition(device) is **/dev/sda7** in my case. it may vary in yours](https://cdn-images-1.medium.com/max/2000/1*OBI3w7XH9LrcRyYk5FP_NA.png)**\*SWAP** partition(device) is **/dev/sda7** in my case. it may vary in yours\*

    mkswap /dev/<SWAP Partition device>
    swapon /dev/<SWAP Partition device>

(replace **<SWAP Partition device>** with the **SWAP** partition device ,ie **/dev/sda7** in my case.)

So in my case it'll be:

    mkswap /dev/sda7
    swapon /dev/sda7

> **Linux** can handle both **ext4** and **NTFS** filesystems . But we are going to use the **ext4** filesystem as **ext4** can support individual files up to 16 terabytes, and volumes up to one exabyte in size.

- **Lets make the ext4 partition on our main drive.**

![**Linux Filesystem Partition**(device) is** /dev/sda**6 in my case. It may vary in yours.](https://cdn-images-1.medium.com/max/2000/1*HlendzrtexKX5PFCxMbHXQ.png)**\*Linux Filesystem Partition**(device) is** /dev/sda**6 in my case. It may vary in yours.\*

    mkfs.ext4 /dev/<Linux Filesystem Device>

(replace **<Linux filesystem device> **with the Linux filesystem partition device ,ie **/dev/sda6** in my case.)

So in my case it'll be:

    mkfs.ext4 /dev/sda6

## Step 4: Mount EFI and Linux filesystem

- **Mount the Linux Filesystem partition device to /mnt**

  mount /dev/<Linux Filesystem Device> /mnt

(replace **<Linux filesystem device>** with the Linux filesystem partition device ,i.e **/dev/sda6** in my case.)

So in my case it'll be:

    mount /dev/sda6 /mnt

- **Mount the EFI partition device to /mnt/boot**

  mkdir /mnt/boot

  mount /dev/<EFI partition device> /mnt/boot

(replace **<EFI partition device>** with the EFI partition device ,ie **/dev/sda5 **in my case.)

So in my case it'll be:

    mount /dev/sda5 /mnt/boot

After mounting check whether it is actually mounted by using the command :

    df

![The two mount points should show up like this](https://cdn-images-1.medium.com/max/2000/1*44lwpGGibkvVACGU-MMhYA.png)_The two mount points should show up like this_

## Step 5: Installing the Linux Firmware to our system

- Now that you have all your partitions set, we can proceed to installing the Linux firmware onto the mounted partitions. To do this, type the following command

  pacstrap /mnt base linux linux-firmware

Get a cup of coffee and relax for a while, the installation may take a while depending upon your network speed.

- After the installation is complete, run the following command to generate **fstab**.

  genfstab -U /mnt >> /mnt/etc/fstab

After running generating **fstab**, check the generated file by:

    vi /mnt/etc/fstab

![It should show something similar , if not the same, don't worry, it just needs to have **/dev/<partition name> **line in it](https://cdn-images-1.medium.com/max/2106/1*cV1DD5IpLn_uEq4mHQ9SAg.png)_It should show something similar , if not the same, don't worry, it just needs to have **/dev/<partition name> **line in it_

Exit by pressing Esc and typing :q

## **Step 6:Lets Change Root to our installed system**

- Change root into the installed system by typing:

  arch-chroot /mnt

## Step 7: Set Timezone of your system

    cd /usr/share/zoneinfo/Asia
    ls

If your zone is Asia , type

    cd /usr/share/zoneinfo/Asia

And respectively for other zones. Form the list find your region.In my case it is Kolkata as im living in India.

With the zone and region figured out, enter it into /etc/localtime

    ln -sf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime

## Step 8: Sync the hardware clock

    hwclock --systohc

## Step 9: Generate Locales

- Install text editor nano :

  pacman -Sy nano

We need to edit the loacle.gen file using nano

    nano /etc/locale.gen

![Clear the # before en_US.UTF-8 UTF-8](https://cdn-images-1.medium.com/max/2000/1*ib2wi8cnNEGSiIKpx_mVBg.png)_Clear the # before en_US.UTF-8 UTF-8_

Scroll down to en_US.UTF-8 UTF-8 and clear the # before the text

Save by pressing CTRl+o, press enter and exit by pressing CTRL+x

**Generate locale**

    locale-gen

![You should see this as the result](https://cdn-images-1.medium.com/max/2016/1*qbvnKcmOgZS2oJm1b2lqBg.png)_You should see this as the result_

**Create locale.conf**

    nano locale.conf

Type the following into the file:

    LANG=en_US.UTF-8

CTRL+o to save, press enter and CTRL+x to exit.

## Step 10: Create Hostname

**To create Hostname file**

    nano /etc/hostname

And type your desired hostname into the file.

My hostname is **adithya** and hence it type it,type **yours** into the file.

CTRL+o to save , press enter and CTRL+x to exit.

**To create Hosts**

    nano /etc/hosts

At the end of the file(next line available), add the lines:

    127.0.0.1    localhost
    ::1          localhost
    127.0.1.1    adithya.localdomain adithya

Replace adithya with <your hostname> .

CTRL+o to save , press enter and CTRL+x to exit.

## Step 11: Set Root Password

    passwd

Enter the password, press enter and retype the pasword.

## Step 12: Add user and set Password for the user

    useradd -g users -G power,storage,wheel -m <username>

Replace **<username>** with a username of your choice.

If it doesnt work , try

    useradd -g users -G power,wheel -m <username>

**Add Password**

    passwd <username>

Replace **<username>** with your username.

Enter the **password**, press enter and retype the **pasword**.

## **Step 13: Install Boot Manager**

    pacman -S grub efibootmgr os-prober

check install by typing os-prober , it shouldnt show any error

**Install grub**

    grub-install --target=x86_64-efi --efi-directory=/boot/ --bootloader-id=GRUB

This is a single line command, with a space in between /boot/ and ' bootloader-id

**Mount Windows EFI System**

    fdisk -l

![Here my EFI for windows is /dev/sda2. It may vary in your case](https://cdn-images-1.medium.com/max/2000/1*7ywTBMtjlXpvytxO45x_HQ.png)_Here my EFI for windows is /dev/sda2. It may vary in your case_

Find your **windows** **EFI** **partition** device id. Mine is **/dev/sda2.**

    mkdir /mnt2/

    mount /dev/sda2 /mnt2

(Replace **/dev/sda2** with your **windows EFI partition **device id.)

After that we need to make the **config** file for grub .

    grub-mkconfig -o /boot/grub/grub.config

![If all goes well, It should show up like this](https://cdn-images-1.medium.com/max/2000/1*Q48o9ZPODVp2HutWFgQNMw.png)_If all goes well, It should show up like this_

## Step 14: Installing Network Drivers

This is a really important step as without network drivers, you will not be able to connect to **WiFi**. This is the step that most people forget to do and end up having to live boot into Arch USB again to install it later.

**To install Network Drivers:**

    pacman -S networkmanager network-manager-applet dialog wireless_tools wpa_supplicant mtools dosfstools base-devel
    linux-headers

The whole command is a single line and **not** multiple lines, with space in between dialog and wireless_tools and space between base-devel and linux-headers.

After the installation is complete, type:

    exit

    unmount -a

And then

    reboot

## Step 15: Boot into Arch Linux

If you successfully boot into Arch Linux ,** congratulations!**

Login -In as **root** user with:

    username:root
    password:<your password for root user set in Step 11>

![Congratulations! You have done it! In spite of all odds!](https://cdn-images-1.medium.com/max/2000/1*VbhUfdg5qm__HGxmv37dWQ.jpeg)_Congratulations! You have done it! In spite of all odds!_

## Step 16: Activate Internet

To activate internet,

    systemctl start NetworkManager

    nmtui

Connect to your wifi network using the GUI.

    systemctl enable NetworkManager

**Step 17:Grant SuperUser Permission to User**

    EDITOR=nano visudo

![clear the # before wheel ALL=(ALL) ALL](https://cdn-images-1.medium.com/max/2000/1*n41FEppNHkAZsJJ8g6LPQA.png)_clear the # before wheel ALL=(ALL) ALL_

clear the **#** before **wheel ALL=(ALL) ALL**

Save by pressing CTRl+o, press enter and exit by pressing CTRL+x

## Step 18:Install Graphics and Display Drivers

**To install Intel Card Drivers:**

    pacman -S xf86-video-intel

Now this is a **mandatory** install for everyone with an **Intel CPU**,

For People having **AMD Graphics Cards,**

    pacman -S xf86-video-amdgpu

For people having **Nvidia Graphics Card,**

    pacman -S nvidia nvidia-utils

**To install Display Server**

    pacman -S xorg

Accept the defaults by hitting enter.

    pacman -S xorg-server

## **Step 19:Installing KDE Plasma Desktop**

**KDE** is one of the more refined and customizable Desktops for Linux.

**To Install Display Manager**

    pacman -S sddm

**Enable sddm**

    systemctl enable sddm

To install **Plasma**

    pacman -S plasma kde-applications

OR

For a **Minimal** install, without any bloatware,

    pacman -S plasma

accept all defaults by pressing enter and start the install.

**CONGRATULATIONS!**

You have successfully Installed **Arch Linux** with **KDE Plasma Desktop!.**

Now to complete the installation,

    reboot

Boot into **Arch Linux** with **KDE Plasma Desktop, Login.**

![Your KDE Plasma desktop should look something like this](https://cdn-images-1.medium.com/max/3840/1*_egnmx8uMUemxZII6MwdBg.png)_Your KDE Plasma desktop should look something like this_

Open terminal and update the repositories.

    sudo pacman -Syyu

![i use arch btw](https://cdn-images-1.medium.com/max/2000/1*Qil2T7MoFxkRlfgaHkr8LA.jpeg)

**That's it! You are done!**

Now enjoy the **plasma** desktop environment. Try out different themes from the theme store. I really love the **McMojave** theme.Cheers!

## Step 19(Alter): Installing GNOME

If u dont want to install **KDE PLasma**, then you can install **GNOME.**

Skip the step for installing KDE and follow the remaining tutorial

**Install the Display manager**

    pacman -S gdm

**Enable gdm**

    systemctl enable gdm

**Install GNOME**

    pacman -S gnome gnome-extra

OR

For minimal Install,

    pacman -S gnome

Now reboot,

    reboot

**CONGRATULATIONS!**

You have successfully Installed **Arch Linux** with **GNOME Desktop!.**

Boot into **Arch Linux** with **GNOME, Login.**

Open terminal and update the repositories.

    sudo pacman -Syyu

**That's it! You are done!**

Now enjoy the **GNOME** desktop environment.!

**_If you have any doubts regarding anything at any point during the installation, or run into any problems during installation,you can refer to the fully fledged [Arch Wiki](https://wiki.archlinux.org/)._**

### Thank you guys!

