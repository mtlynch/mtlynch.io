{ config, pkgs, lib, ... }:

let
  hostname = "pinix";
  user = "tempuser";
  password = "somepass";
  # Versions after this commit fail.
  # https://github.com/NixOS/nixos-hardware/issues/651
  nixosHardwareVersion = "ad1114ee372a52aa0b4934f72835bd14a212a642";

  timeZone = "America/New_York";
  defaultLocale = "en_US.UTF-8";
in {
  imports = ["${fetchTarball "https://github.com/NixOS/nixos-hardware/archive/${nixosHardwareVersion}.tar.gz" }/raspberry-pi/4"];

  fileSystems = {
    "/" = {
      device = "/dev/disk/by-label/NIXOS_SD";
      fsType = "ext4";
      options = [ "noatime" ];
    };
  };

  networking.hostName = hostname;

  environment.systemPackages = with pkgs; [
    firefox
    vim
  ];

  services.openssh.enable = true;

  time.timeZone = "America/New_York";

  i18n = {
    defaultLocale = defaultLocale;
    extraLocaleSettings = {
      LC_ADDRESS = defaultLocale;
      LC_IDENTIFICATION = defaultLocale;
      LC_MEASUREMENT = defaultLocale;
      LC_MONETARY = defaultLocale;
      LC_NAME = defaultLocale;
      LC_NUMERIC = defaultLocale;
      LC_PAPER = defaultLocale;
      LC_TELEPHONE = defaultLocale;
      LC_TIME = defaultLocale;
    };
  };

  users = {
    mutableUsers = false;
    users."${user}" = {
      isNormalUser = true;
      password = password;
      extraGroups = [ "wheel" ];
    };
  };

  # Enable passwordless sudo.
  security.sudo.extraRules= [
    {  users = [ user ];
      commands = [
         { command = "ALL" ;
           options= [ "NOPASSWD" ];
        }
      ];
    }
  ];

  # Enable GPU acceleration
  hardware.raspberry-pi."4".fkms-3d.enable = true;

  services.xserver = {
    enable = true;
    displayManager.gdm.enable = true;
    desktopManager.gnome.enable = true;
  };

  hardware.pulseaudio.enable = true;

  system.stateVersion = "21.11";
}
