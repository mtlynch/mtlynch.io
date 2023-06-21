{ config, pkgs, lib, ... }:

# TODO: Can we set root password?

let
  hostname = "pinix";
  user = "mike";
  password = "somepass";
  sshPublicKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC4JsvmCGXcz4W+84YJeoIE3ydeAF/lIGPuBrDTmF1a+HYdxbdjyp4hjg9f0vOJfnYMgexwggdD9imIPYMK26qdaOx68E/ehUltqZeD+ktIcKpNe0YbjEe4GxDedHZ5MqmUaE6PBfAODiPMcNcqRIPr+u2ct/wNC3c1D8tNCb92YC0MEtFceqPukFBXt2dMfDSSMGAT8zLJ8r5GM2C8kWJf2sSB2P9ApwwKqJatqLh+6wL5cHSgAj4ZIIro0apc1Bx2+Mu0vmoWudLDhDaqZCu+Z7jR9gtw+ZdKlJt5lXeG+9rZOYj6PYOxjoKBaCzww92JrZNRHa62QxTMrTL0EXxj";
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

  environment.systemPackages = with pkgs; [ vim ];

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
      openssh.authorizedKeys.keys = [ sshPublicKey ];
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
    displayManager.lightdm.enable = true;
    desktopManager.xfce.enable = true;
  };

  hardware.pulseaudio.enable = true;

  system.stateVersion = "21.11";
}
